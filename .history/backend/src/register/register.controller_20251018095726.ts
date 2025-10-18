import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';


@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() body: any) {
    return this.registerService.registerUser(body);
  }
}
