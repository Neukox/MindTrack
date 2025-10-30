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

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
      maxAge: this.appConfig.get<number>('JWT_REFRESH_EXPIRATION')! * 1000, // em milissegundos
    });

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

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
      maxAge: this.appConfig.get<number>('JWT_REFRESH_EXPIRATION')! * 1000, // em milissegundos
    });

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

    const resetUrl = `${this.appConfig.get<string>('clientUrl')}/reset-password?token=${token}`;

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

    this.logger.debug(`Refreshing access token for user ID: ${payload.sub}`);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Acesso Negado');
    }

    const accessToken = await this.tokenService.generateAccessToken({
      sub: user.id,
      email: user.email,
      nome: user.username,
    });

    return accessToken;
  }

  async logout(userId: string) {
    await this.userService.setRefreshToken(userId, null);
  }
}
