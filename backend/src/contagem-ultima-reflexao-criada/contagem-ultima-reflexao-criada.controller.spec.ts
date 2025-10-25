import { Test, TestingModule } from '@nestjs/testing';
import { ContagemUltimaReflexaoCriadaController } from './contagem-ultima-reflexao-criada.controller';

describe('ContagemUltimaReflexaoCriadaController', () => {
  let controller: ContagemUltimaReflexaoCriadaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContagemUltimaReflexaoCriadaController],
    }).compile();

    controller = module.get<ContagemUltimaReflexaoCriadaController>(
      ContagemUltimaReflexaoCriadaController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
