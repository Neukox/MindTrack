import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
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
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterPayload): Promise<{ message: string; user: { id: string; username: string; email: string } }> {
    const result = await this.registerService.registerUser(body);
    return result;
  }
}
