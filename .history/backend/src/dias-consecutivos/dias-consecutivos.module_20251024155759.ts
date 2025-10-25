import { Module } from '@nestjs/common';
import { DiasConsecutivosService } from './dias-consecutivos.service';
import { DiasConsecutivosController } from './dias-consecutivos.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DiasConsecutivosService, PrismaService],
  controllers: [DiasConsecutivosController],
})
export class DiasConsecutivosModule {}
