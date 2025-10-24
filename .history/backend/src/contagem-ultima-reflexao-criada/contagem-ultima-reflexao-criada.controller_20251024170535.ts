import { Controller, Get, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ContagemUltimaReflexaoCriadaService } from './contagem-ultima-reflexao-criada.service';
import JwtAuthGuard from '@/auth/guards/jwt-auth.guard';

@Controller('contagem-ultima-reflexao-criada')
export class ContagemUltimaReflexaoCriadaController {
  constructor(
    private readonly contagemService: ContagemUltimaReflexaoCriadaService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async contar(@Request() req: any) {
    const userId: string = req.user?.sub;
    
    if (!userId) {
      throw new BadRequestException('Token inválido: usuário não identificado.');
    }

    return this.contagemService.contagemUltimaReflexaoCriadaPorUsuario(userId);
  }
}
