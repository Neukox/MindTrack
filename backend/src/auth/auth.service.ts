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
import { ConfigService, type ConfigType } from '@nestjs/config';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

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
    private readonly appConfig: ConfigService,
    
  ) {}

  async login(loginDto: LoginDto) {
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

    return {
      message: 'Login realizado com sucesso.',
      user: {
        id: userEncontrado.id,
        username: userEncontrado.username,
        email: userEncontrado.email,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, username, password } = registerDto;

    const usuarioExistente = await this.userService.findByEmail(email);

    if (usuarioExistente) {
      throw new ConflictException('E-mail já está em uso.');
    }

    const hashedPassword = await this.hashingService.hash(password);

    const novoUsuario = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });

    this.logger.log(`Novo usuário registrado: ${novoUsuario.email}`);

    return {
      message: 'Usuário registrado com sucesso.',
      user: {
        id: novoUsuario.id,
        username: novoUsuario.username,
        email: novoUsuario.email,
      },
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

    const resetUrl = `${this.appConfig.get<string>('CLIENT_URL')}/reset-password?token=${token}`;

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
}
