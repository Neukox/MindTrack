import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RecoverPasswordDto from './dto/recovery-password.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import RecoverPasswordEmailService from '@/email/services/recover-password-email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly recoverEmailService: RecoverPasswordEmailService,
  ) {}

  @Post('recover-password')
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    const { email } = recoverPasswordDto;

    const payload = await this.authService.requestPasswordReset(email);

    // TODO -> Criar serviço de envio de e-mail
    await this.recoverEmailService.sendRecoverPasswordEmail(
      payload.to,
      payload.name,
      payload.resetUrl,
    );

    return { message: 'E-mail de recuperação de senha enviado,' };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { token, new_password } = resetPasswordDto;

    await this.authService.resetPassword(token, new_password);

    return { message: 'Senha redefinida com sucesso.' };
  }
}
