import { Test, TestingModule } from '@nestjs/testing';
import { ReflexaoController } from './reflexao.controller';

describe('ReflexaoController', () => {
  let controller: ReflexaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReflexaoController],
    }).compile();

    controller = module.get<ReflexaoController>(ReflexaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
