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
      nome: userEncontrado.username,
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
      nome: novoUsuario.username,
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

    const accessToken = await this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
      nome: user.username,
    });

    return accessToken;
  }

  async logout(userId: string, res: Response) {
    res.clearCookie('refresh_token');
    await this.userService.setRefreshToken(userId, null);
  }

  async setRefreshCookie(res: Response, refreshToken: string) {
    const isProd = this.appConfig.get<string>('NODE_ENV') === 'production';
    const secureEnv = this.appConfig.get<boolean>('COOKIE_SECURE')!;
    const sameSiteEnv = this.appConfig.get<string>('COOKIE_SAME_SITE')!;

    let secure = secureEnv ? secureEnv === true : isProd;
    let sameSite = sameSiteEnv ?? (isProd ? 'lax' : 'none');

    this.logger.debug(
      `Setting refresh token cookie with secure=${secure} and sameSite=${sameSite}`,
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure,
      sameSite: sameSite as 'lax' | 'strict' | 'none',
      maxAge: this.appConfig.get<number>('JWT_REFRESH_EXPIRATION')!, // em milissegundos
    });
  }
}
