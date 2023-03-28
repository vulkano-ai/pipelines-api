import { Test, TestingModule } from '@nestjs/testing';
import { HlsController } from '../hls.controller';
import { HlsService } from '../hls.service';

describe('HlsController', () => {
  let controller: HlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HlsController],
      providers: [HlsService],
    }).compile();

    controller = module.get<HlsController>(HlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
