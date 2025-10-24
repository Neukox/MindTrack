import {
  Controller,
  Get,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { ContagemTotalRegistrosService } from './contagem-total-registros.service';
import JwtAuthGuard from '@/auth/guards/jwt-auth.guard';

@Controller('contagem-total-registros')
export class ContagemTotalRegistrosController {
  constructor(
    private readonly contagemService: ContagemTotalRegistrosService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async contarTotalRegistros(@Request() req: any) {
    const userId: string = req.user?.sub;

    if (!userId) {
      throw new BadRequestException(
        'Token inválido: usuário não identificado.',
      );
    }

    return this.contagemService.contarTotalRegistrosPorUsuario(userId);
  }
}
