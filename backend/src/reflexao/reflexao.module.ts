import { Module } from '@nestjs/common';
import { ReflexaoService } from './reflexao.service';
import { ReflexaoController } from './reflexao.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ReflexaoService, PrismaService],
  controllers: [ReflexaoController],
  exports: [ReflexaoService],
})
export class ReflexaoModule {}
