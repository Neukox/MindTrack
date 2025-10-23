import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import RecoverPasswordDto from './dto/recovery-password.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import RecoverPasswordEmailService from '@/email/services/recover-password-email.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly recoverEmailService: RecoverPasswordEmailService,
  ) {}

  @ApiOperation({
    summary: 'Solicitar recuperação de senha',
    description:
      'Envia um e-mail com instruções para redefinir a senha do usuário.',
  })
  @ApiBody({ type: RecoverPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'E-mail de recuperação de senha enviado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Usuario não encontrado',
  })
  @Post('recover-password')
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    const { email } = recoverPasswordDto;

    const payload = await this.authService.requestPasswordReset(email);

    // TODO -> Configurar serviço de envio de e-mail
    // Por enquanto, retorna o token para testes
    console.log('Token de reset:', payload.resetUrl);

    try {
      await this.recoverEmailService.sendRecoverPasswordEmail(
        payload.to,
        payload.name,
        payload.resetUrl,
      );
      return { message: 'E-mail de recuperação de senha enviado.' };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      // Retorna o token para teste quando email falha
      return {
        message: 'Erro no envio de email. Token para teste:',
        token: payload.resetUrl.split('token=')[1],
      };
    }
  }

  @ApiOperation({
    summary: 'Redefinir senha',
    description: 'Redefine a senha do usuário usando o token de recuperação.',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Senha redefinida com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Token inválido ou expirado.',
  })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { token, new_password } = resetPasswordDto;

    await this.authService.resetPassword(token, new_password);

    return { message: 'Senha redefinida com sucesso.' };
  }
}
