import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  providers: [ResetPasswordService, PrismaService],
  exports: [ResetPasswordService],
})
export class ResetPasswordModule {}
