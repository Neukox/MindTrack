import { Test, TestingModule } from '@nestjs/testing';
import { EdicaoRegistrosController } from './edicao-registros.controller';

describe('EdicaoRegistrosController', () => {
  let controller: EdicaoRegistrosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdicaoRegistrosController],
    }).compile();

    controller = module.get<EdicaoRegistrosController>(
      EdicaoRegistrosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
