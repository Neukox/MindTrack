import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';

@Module({
  providers: [ResetPasswordService],
  controllers: [ResetPasswordController]
})
export class ResetPasswordModule {}
