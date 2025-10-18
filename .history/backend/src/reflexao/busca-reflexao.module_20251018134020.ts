import { Module } from '@nestjs/common';
import { BuscaReflexaoController } from './busca-reflexao.controller';
import { BuscaReflexaoService } from './busca-reflexao.service';

@Module({
  controllers: [BuscaReflexaoController],
  providers: [BuscaReflexaoService],
  exports: [BuscaReflexaoService],
})
export class BuscaReflexaoModule {}