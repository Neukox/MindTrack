import { Test, TestingModule } from '@nestjs/testing';
import { RegistrosEssaSemanaService } from './registros-essa-semana.service';

describe('RegistrosEssaSemanaService', () => {
  let service: RegistrosEssaSemanaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrosEssaSemanaService],
    }).compile();

    service = module.get<RegistrosEssaSemanaService>(RegistrosEssaSemanaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
