import { ResetPasswordService } from '@/reset-password/reset-password.service';
import { UserService } from '@/user/user.service';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import HashingService from './hashing/hashing.service';
import TokenHashingService from './hashing/token-hashing.service';
import resetPasswordConfig from './config/resetPassword.config';
import { ConfigService, type ConfigType } from '@nestjs/config';
import RecoverPasswordEmailService from '@/email/services/recover-password-email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly tokenHashingService: TokenHashingService,
    private readonly resetPasswordService: ResetPasswordService,
    @Inject(resetPasswordConfig.KEY)
    private readonly passRecoveryConfig: ConfigType<typeof resetPasswordConfig>,
    private readonly appConfig: ConfigService,
    private readonly emailService: RecoverPasswordEmailService,
  ) {}

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
