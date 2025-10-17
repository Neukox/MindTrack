import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { LoginService } from './login.service';
import { RegisterModule } from './register/register.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';

@Module({
  imports: [LoginModule, RegisterModule, ResetPasswordModule],
  controllers: [AppController],
  providers: [AppService, LoginService],
})
export class AppModule {}
