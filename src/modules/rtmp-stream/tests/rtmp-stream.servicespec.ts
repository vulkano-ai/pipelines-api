import { TestingModule } from '@nestjs/testing';
import { getPipelineTestModule } from './rtmp-stream.testmodule';
import { Model } from 'mongoose';
import { RtmpStreamModel } from '../models/rtmp-stream';
import { getModelToken } from '@nestjs/mongoose';
import { RtmpStreamService } from '../rtmp-stream.service';

describe('PipelinesService', () => {
  let service: RtmpStreamService;
  let module: TestingModule;
  let model;
  let record;
  beforeEach(async () => {
    module = await getPipelineTestModule().compile();
    service = module.get<RtmpStreamService>(RtmpStreamService);
    model = module.get<Model<RtmpStreamModel>>(getModelToken('RtmpStream'));
    await record.save();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
