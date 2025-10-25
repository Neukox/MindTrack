import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import RecoverPasswordDto from './dto/recovery-password.dto';
import ResetPasswordDto from './dto/reset-password.dto';
import RecoverPasswordEmailService from '@/email/services/recover-password-email.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import type { Request, Response } from 'express';
import JwtRefreshGuard from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly recoverEmailService: RecoverPasswordEmailService,
  ) {}

  @ApiOperation({
    summary: 'Login de usuário',
    description: 'Autentica um usuário com e-mail e senha.',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validação falhou.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  @ApiResponse({
    status: 401,
    description: 'Senha incorreta.',
  })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(loginDto, res);
  
    return {
      message: 'Login realizado com sucesso',
      accessToken: result.accessToken,
      user: { ...result.payload },
    };
  }

  @ApiOperation({
    summary: 'Registro de novo usuário',
    description: 'Registra um novo usuário no sistema.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Validação falhou.',
  })
  @ApiResponse({
    status: 409,
    description: 'E-mail já está em uso.',
  })
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto, res);

    return {
      message: 'Usuário registrado com sucesso',
      accessToken: result.accessToken,
      user: { ...result.payload },
    };
  }

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

  @ApiOperation({
    summary: 'Refresh do token de acesso',
    description:
      'Gera um novo token de acesso usando o token de refresh válido.',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 401,
    description: 'Acesso negado.',
  })
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req: Request) {
    const payload = req.user;

    console.log('Payload do refresh token:', payload);

    const accessToken = await this.authService.refreshAccessToken(payload);

    return { accessToken };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const payload = req.user as any;

    await this.authService.logout(payload.sub);

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { message: 'Logout realizado com sucesso.' };
  }
}
