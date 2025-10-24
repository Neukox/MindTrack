import { Module } from '@nestjs/common';
import { RegistrosEssaSemanaService } from './registros-essa-semana.service';
import { RegistrosEssaSemanaController } from './registros-essa-semana.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [RegistrosEssaSemanaService, PrismaService],
  controllers: [RegistrosEssaSemanaController],
})
export class RegistrosEssaSemanaModule {}
