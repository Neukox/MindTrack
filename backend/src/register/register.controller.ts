import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { RegisterService } from './register.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({
    summary: 'Registrar um novo usuário',
    description:
      'Cria um novo usuário no sistema com as informações fornecidas.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de registro inválidos',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() body: RegisterPayload,
  ): Promise<{
    message: string;
    user: { id: string; username: string; email: string };
  }> {
    const result = await this.registerService.registerUser(body);
    return result;
  }
}
