import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RecoverPasswordDto from './dto/recovery-password.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { RecoveryPasswordSchema } from './schemas/reset-password.schema';
import ResetPasswordDto from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('recover-password')
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    const { email } = recoverPasswordDto;

    const token = await this.authService.requestPasswordReset(email);

    // TODO -> Criar serviço de envio de e-mail

    return { message: 'E-mail de recuperação de senha enviado,', token };
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { token, new_password } = resetPasswordDto;

    await this.authService.resetPassword(token, new_password);

    return { message: 'Senha redefinida com sucesso.' };
  }
}
