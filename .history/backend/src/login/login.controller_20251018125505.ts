import { Controller } from '@nestjs/common';
import { LoginService } from './login.service';
import { Body, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ message: string }> {
    await this.loginService.LoginUser(body);
    return { message: 'Login realizado com sucesso.' };
  }
}
