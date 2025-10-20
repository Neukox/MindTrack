import { Test, TestingModule } from '@nestjs/testing';
import { EdicaoRegistrosService } from './edicao-registros.service';

describe('EdicaoRegistrosService', () => {
  let service: EdicaoRegistrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdicaoRegistrosService],
    }).compile();

    service = module.get<EdicaoRegistrosService>(EdicaoRegistrosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
