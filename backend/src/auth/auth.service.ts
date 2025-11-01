import { ResetPasswordService } from '@/reset-password/reset-password.service';
import { UserService } from '@/user/user.service';
import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import HashingService from './hashing/hashing.service';
import TokenHashingService from './hashing/token-hashing.service';
import resetPasswordConfig from './config/resetPassword.config';
import appConfig from '@/app.config';
import { ConfigService, type ConfigType } from '@nestjs/config';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import TokenService from './tokens.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly tokenHashingService: TokenHashingService,
    private readonly resetPasswordService: ResetPasswordService,
    @Inject(resetPasswordConfig.KEY)
    private readonly passRecoveryConfig: ConfigType<typeof resetPasswordConfig>,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    //Buscando se usuário existe no banco de dados
    const userEncontrado = await this.userService.findByEmail(email);

    if (!userEncontrado) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const senhaCorreta = await this.hashingService.compare(
      password,
      userEncontrado.password,
    );

    if (!senhaCorreta) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    //Login bem sucedido
    this.logger.log(
      `Login bem sucedido para o usuário: ${userEncontrado.email}`,
    );

    const payload = {
      sub: userEncontrado.id,
      email: userEncontrado.email,
      username: userEncontrado.username,
    };

    const { accessToken, refreshToken } =
      await this.generateTokensPair(payload);

    const hashedRefreshToken = await this.hashingService.hash(refreshToken);

    await this.userService.setRefreshToken(
      userEncontrado.id,
      hashedRefreshToken,
    );

    this.setRefreshCookie(res, refreshToken);

    return {
      accessToken,
      payload,
    };
  }

  async register(registerDto: RegisterDto, res: Response) {
    const { email, username, password } = registerDto;

    const usuarioExistente = await this.userService.findByEmail(email);

    if (usuarioExistente) {
      throw new ConflictException('E-mail já está em uso.');
    }

    const hashedPassword = await this.hashingService.hash(password);

    const novoUsuario = await this.userService.create({
      email,
      username,
      password: hashedPassword,
    });

    this.logger.log(`Novo usuário registrado: ${novoUsuario.email}`);

    const payload = {
      sub: novoUsuario.id,
      email: novoUsuario.email,
      username: novoUsuario.username,
    };

    const { accessToken, refreshToken } =
      await this.generateTokensPair(payload);

    const hashedRefreshToken = await this.hashingService.hash(refreshToken);

    await this.userService.setRefreshToken(novoUsuario.id, hashedRefreshToken);

    this.setRefreshCookie(res, refreshToken);

    return {
      accessToken,
      payload,
    };
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const token = this.tokenHashingService.generate();
    const hashedToken = this.tokenHashingService.hash(token);

    const expiresAt = new Date(
      Date.now() + this.passRecoveryConfig.tokenExpirationMinutes * 60 * 1000,
    );

    await this.resetPasswordService.setTokenRecovery(
      user.id,
      hashedToken,
      expiresAt,
    );

    const resetUrl = `${this.appConfiguration.clientUrl}/reset-password?token=${token}`;

    return {
      to: user.email,
      name: user.username,
      resetUrl,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const hashedToken = this.tokenHashingService.hash(token);

    const tokenRecord =
      await this.resetPasswordService.findValidToken(hashedToken);

    if (!tokenRecord) {
      throw new NotFoundException('Token inválido ou expirado');
    }

    const hashedPassword = await this.hashingService.hash(newPassword);

    await this.userService.changePassword(tokenRecord.userId, hashedPassword);
    await this.resetPasswordService.deleteTokens(tokenRecord.userId);
  }

  async generateTokensPair(payload: any) {
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(payload: any) {
    const user = await this.userService.findOne(payload.sub);

    if (!user || !user.refreshToken) {
      this.logger.warn(
        `Tentativa de refresh de token falhou para o usuário ID: ${payload.sub}`,
      );
      throw new UnauthorizedException('Acesso Negado');
    }

    this.logger.debug(`Refreshing access token for user ID: ${payload.sub}`);

    const newPayload = {
      sub: user.id,
      email: user.email,
      username: user.username, // Corrigindo de 'nome' para 'username'
    };

    const accessToken = await this.tokenService.generateAccessToken(newPayload);

    return accessToken;
  }

  async logout(userId: string, res: Response) {
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';
    const secureEnv = this.configService.get<any>('COOKIE_SECURE');
    const sameSiteEnv = this.configService.get<string>('COOKIE_SAME_SITE');

    // Parse COOKIE_SECURE when provided as string or boolean
    const secure =
      secureEnv === true ||
      (typeof secureEnv === 'string' && secureEnv.toLowerCase() === 'true')
        ? true
        : secureEnv === false ||
            (typeof secureEnv === 'string' &&
              secureEnv.toLowerCase() === 'false')
          ? false
          : isProd;

    const sameSite = sameSiteEnv || (isProd ? 'none' : 'lax');

    const clearOptions: any = {
      httpOnly: true,
      secure,
      sameSite: sameSite as 'lax' | 'strict' | 'none',
      ...(isProd && {
        domain: undefined,
      }),
    };

    res.clearCookie('refresh_token', clearOptions);
    await this.userService.setRefreshToken(userId, null);
  }

  async setRefreshCookie(res: Response, refreshToken: string) {
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';
    const secureEnv = this.configService.get<any>('COOKIE_SECURE');
    const sameSiteEnv = this.configService.get<string>('COOKIE_SAME_SITE');

    // Parse COOKIE_SECURE which may be provided as string ("true"/"false") or boolean
    const secure =
      secureEnv === true ||
      (typeof secureEnv === 'string' && secureEnv.toLowerCase() === 'true')
        ? true
        : secureEnv === false ||
            (typeof secureEnv === 'string' &&
              secureEnv.toLowerCase() === 'false')
          ? false
          : isProd;

    const sameSite = sameSiteEnv || (isProd ? 'none' : 'lax');

    const cookieOptions: any = {
      httpOnly: true,
      secure,
      sameSite: sameSite as 'lax' | 'strict' | 'none',
      maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRATION')!, // converter segundos para milissegundos
      ...(isProd && {
        domain: undefined,
      }),
    };

    this.logger.debug(
      `Setting refresh token cookie with secure=${secure} and sameSite=${sameSite} for environment=${isProd ? 'production' : 'development'}`,
    );

    res.cookie('refresh_token', refreshToken, cookieOptions);
  }
}
