import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { registerUser } from '../../../.history/backend/src/register/register.service_20251018091311';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() body: typeof registerUser): Promise<{ message: string }> {
    await this.registerService.registerUser(body);
    return { message: 'Usuário registrado com sucesso.' };
  }
}
