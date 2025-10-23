import { Module } from '@nestjs/common';
import { EdicaoRegistrosService } from './edicao-registros.service';
import { EdicaoRegistrosController } from './edicao-registros.controller';

@Module({
  providers: [EdicaoRegistrosService],
  controllers: [EdicaoRegistrosController],
})
export class EdicaoRegistrosModule {}
