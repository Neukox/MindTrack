import { Test, TestingModule } from '@nestjs/testing';
import { RegistrosEssaSemanaController } from './registros-essa-semana.controller';

describe('RegistrosEssaSemanaController', () => {
  let controller: RegistrosEssaSemanaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrosEssaSemanaController],
    }).compile();

    controller = module.get<RegistrosEssaSemanaController>(RegistrosEssaSemanaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
