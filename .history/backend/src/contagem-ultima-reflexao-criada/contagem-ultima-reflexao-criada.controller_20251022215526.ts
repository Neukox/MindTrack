import { Controller, Get } from '@nestjs/common';
import { ContagemUltimaReflexaoCriadaService } from './contagem-ultima-reflexao-criada.service';
@Controller('contagem-ultima-reflexao-criada')
export class ContagemUltimaReflexaoCriadaController {
  constructor(
    private readonly contagemService: ContagemUltimaReflexaoCriadaService,
  ) {}

  @Get()
  async contar(): Promise<Date | null> {
    return this.contagemService.contagemUltimaReflexaoCriada();
  }
}
