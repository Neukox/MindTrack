import { Test, TestingModule } from '@nestjs/testing';
import { DiasConsecutivosController } from './dias-consecutivos.controller';

describe('DiasConsecutivosController', () => {
  let controller: DiasConsecutivosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiasConsecutivosController],
    }).compile();

    controller = module.get<DiasConsecutivosController>(DiasConsecutivosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
