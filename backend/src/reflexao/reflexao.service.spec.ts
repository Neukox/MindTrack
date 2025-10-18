import { Test, TestingModule } from '@nestjs/testing';
import { ReflexaoService } from './reflexao.service';

describe('ReflexaoService', () => {
  let service: ReflexaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReflexaoService],
    }).compile();

    service = module.get<ReflexaoService>(ReflexaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
