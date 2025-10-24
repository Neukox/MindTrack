import { Test, TestingModule } from '@nestjs/testing';
import { DiasConsecutivosService } from './dias-consecutivos.service';

describe('DiasConsecutivosService', () => {
  let service: DiasConsecutivosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiasConsecutivosService],
    }).compile();

    service = module.get<DiasConsecutivosService>(DiasConsecutivosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
