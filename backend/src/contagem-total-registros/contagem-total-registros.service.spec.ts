import { Test, TestingModule } from '@nestjs/testing';
import { ContagemTotalRegistrosService } from './contagem-total-registros.service';

describe('ContagemTotalRegistrosService', () => {
  let service: ContagemTotalRegistrosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContagemTotalRegistrosService],
    }).compile();

    service = module.get<ContagemTotalRegistrosService>(
      ContagemTotalRegistrosService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
