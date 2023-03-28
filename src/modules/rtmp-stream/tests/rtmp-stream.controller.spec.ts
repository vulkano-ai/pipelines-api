import { TestingModule } from '@nestjs/testing';
import { RtmpStreamController } from '../rtmp-stream.controller';
import { getPipelineTestModule } from './rtmp-stream.testmodule';
import { Model } from 'mongoose';
import { RtmpStreamModel } from '../models/rtmp-stream';
import { getModelToken } from '@nestjs/mongoose';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PipelinesService } from '../../pipelines/pipelines.service';
import {
  HttpMethod,
  InputProtocol,
  InputProvider,
  OutputProtocol,
  OutputProvider,
} from '@livestream-ml/inference-io-proto/nest';
const pipelineData = {
  streamKey: 'test',
  input: [
    {
      providerType: InputProvider.INPUT_INTERNAL,
      protocol: InputProtocol.INPUT_RTMP,
      rtmpConfig: { uri: 'rtmp://test.com:1935/app' },
    },
  ],
  output: [
    {
      providerType: OutputProvider.OUTPUT_INTERNAL,
      protocol: OutputProtocol.OUTPUT_HLS,
      hlsConfig: { uri: 'https://example.com', method: HttpMethod.POST },
      rtmpConfig: undefined,
    },
  ],
  videoFilters: [],
  audioFilters: [],
  record: false,
};
describe('PipelinesController', () => {
  let controller: RtmpStreamController;
  let module: TestingModule;
  let model;
  let app: INestApplication;
  let pipelineService: PipelinesService;
  beforeEach(async () => {
    module = await getPipelineTestModule().compile();
    app = module.createNestApplication();
    await app.init();
    controller = module.get<RtmpStreamController>(RtmpStreamController);
    model = module.get<Model<RtmpStreamModel>>(getModelToken('RtmpStream'));
    pipelineService = module.get<PipelinesService>(PipelinesService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /app/play', () => {
    it('should return OK - 200', () =>
      request(app.getHttpServer()).post('/rtmp-streams/app/play').expect(200));
  });

  describe('POST /app/play_done', () => {
    it('should return OK - 200', () =>
      request(app.getHttpServer())
        .post('/rtmp-streams/app/play_done')
        .expect(200));
  });

  describe('POST /app/publish', () => {
    describe('Given a valid stream key', () => {
      it('should return OK - 200', async () => {
        const { streamKey } = await pipelineService.create(pipelineData);
        return request(app.getHttpServer())
          .post('/rtmp-streams/app/publish')
          .send({
            app: 'app',
            addr: '127.0.0.1',
            name: streamKey,
          })
          .expect(200);
      });
    });
    describe('Given an invalid stream key', () => {
      it('should return Unauthorized - 401', () => {
        return request(app.getHttpServer())
          .post('/rtmp-streams/app/publish')
          .send({
            app: 'app',
            addr: '127.0.0.1',
            name: 'invalid-stream-key',
          })
          .expect(401);
      });
    });
  });
});
