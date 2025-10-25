import { Test, TestingModule } from '@nestjs/testing';
import { ContagemTotalRegistrosController } from './contagem-total-registros.controller';

describe('ContagemTotalRegistrosController', () => {
  let controller: ContagemTotalRegistrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContagemTotalRegistrosController],
    }).compile();

    controller = module.get<ContagemTotalRegistrosController>(
      ContagemTotalRegistrosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
