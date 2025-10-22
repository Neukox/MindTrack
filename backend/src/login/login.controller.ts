import { Controller } from '@nestjs/common';
import { LoginService } from './login.service';
import { Body, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({
    summary: 'Login de usuário',
    description: 'Autentica um usuário com email e senha fornecidos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário autenticado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  @Post()
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{
    message: string;
    user: { id: string; username: string; email: string };
  }> {
    const result = await this.loginService.LoginUser(body);
    return result;
  }
}
