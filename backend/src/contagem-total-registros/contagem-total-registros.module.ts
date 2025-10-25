import { Module } from '@nestjs/common';
import { ContagemTotalRegistrosService } from './contagem-total-registros.service';
import { ContagemTotalRegistrosController } from './contagem-total-registros.controller';

@Module({
  providers: [ContagemTotalRegistrosService],
  controllers: [ContagemTotalRegistrosController],
})
export class ContagemTotalRegistrosModule {}
