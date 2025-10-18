import { Controller } from '@nestjs/common';
import


@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() body: any) {
    return this.registerService.registerUser(body);
  }
}
