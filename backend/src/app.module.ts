import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ReflexaoModule } from './reflexao/reflexao.module';

@Module({
  imports: [LoginModule, RegisterModule, ResetPasswordModule, ReflexaoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
