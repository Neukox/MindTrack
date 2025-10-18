import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';

type RegisterPayload = {
  username: string;
  password: string;
  email: string;
};

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(
    @Body() body: RegisterPayload,
  ): Promise<{ message: string }> {
    await this.registerService.registerUser(body);
    return { message: 'Usuário registrado com sucesso.' };
  }
}
