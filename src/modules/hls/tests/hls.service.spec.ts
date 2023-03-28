import { Test, TestingModule } from '@nestjs/testing';
import { HlsService } from '../hls.service';

describe('HlsService', () => {
  let service: HlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HlsService],
    }).compile();

    service = module.get<HlsService>(HlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
