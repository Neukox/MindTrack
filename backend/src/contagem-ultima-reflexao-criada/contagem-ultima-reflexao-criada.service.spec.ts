import { Test, TestingModule } from '@nestjs/testing';
import { ContagemUltimaReflexaoCriadaService } from './contagem-ultima-reflexao-criada.service';

describe('ContagemUltimaReflexaoCriadaService', () => {
  let service: ContagemUltimaReflexaoCriadaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContagemUltimaReflexaoCriadaService],
    }).compile();

    service = module.get<ContagemUltimaReflexaoCriadaService>(
      ContagemUltimaReflexaoCriadaService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
