import { Module } from '@nestjs/common';
import { ContagemUltimaReflexaoCriadaService } from './contagem-ultima-reflexao-criada.service';
import { ContagemUltimaReflexaoCriadaController } from './contagem-ultima-reflexao-criada.controller';

@Module({
  providers: [ContagemUltimaReflexaoCriadaService],
  controllers: [ContagemUltimaReflexaoCriadaController],
})
export class ContagemUltimaReflexaoCriadaModule {}
