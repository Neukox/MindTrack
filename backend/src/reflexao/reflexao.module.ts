import { Module } from '@nestjs/common';
import { ReflexaoService } from './reflexao.service';
import { ReflexaoController } from './reflexao.controller';

@Module({
  providers: [ReflexaoService],
  controllers: [ReflexaoController]
})
export class ReflexaoModule {}
