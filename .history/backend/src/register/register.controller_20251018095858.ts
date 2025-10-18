import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() body: RegisterController {
    await this.registerService.registerUser(body);
    return { message: 'Usuário registrado com sucesso.' };
  }
}
