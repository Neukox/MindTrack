import { Controller } from '@nestjs/common';
import { ContagemTotalRegistrosService } from './contagem-total-registros.service';
@Controller('contagem-total-registros')
export class ContagemTotalRegistrosController {
  constructor(private readonly contagemService: ContagemTotalRegistrosService) {}

  @Get()
  async contarTotalRegistros(): Promise<number> {
    return this.contagemService.contarTotalRegistros();
  }
}
