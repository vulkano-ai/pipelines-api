import { TestingModule } from '@nestjs/testing';
import { PipelinesController } from '../pipelines.controller';
import request from 'supertest';
import { getPipelineTestModule } from './pipelines.testmodule';
import { Model } from 'mongoose';
import { PipelineModel } from '../models/pipeline';
import { getModelToken } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { PipelinesService } from '../pipelines.service';
import {
  HttpMethod,
  InputProtocol,
  InputProvider,
  OutputProtocol,
  OutputProvider,
} from '@livestream-ml/inference-io-proto/nest';

// TODO: test pipeline nested field validation
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
  let controller: PipelinesController;
  let module: TestingModule;
  let model;
  let app: INestApplication;
  let pipelineService: PipelinesService;

  beforeEach(async () => {
    module = await getPipelineTestModule().compile();
    controller = module.get<PipelinesController>(PipelinesController);
    model = module.get<Model<PipelineModel>>(getModelToken('Pipeline'));
    pipelineService = module.get<PipelinesService>(PipelinesService);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /pipelines', () => {
    it('should return pipeline list', async () => {
      await pipelineService.create(pipelineData);
      const { status, body } = await request(app.getHttpServer()).get(
        '/pipelines',
      );
      expect(status).toEqual(200);
      expect(body).toBeDefined();
      const { rows, count } = body;
      expect(count).toBeGreaterThan(0);
      expect(Array.isArray(rows)).toBe(true);
      expect(rows.length).toBeGreaterThan(0);
      const p = rows[0];
      expect(p._id).toBeTruthy();
      expect(p.streamKey).toBeTruthy();
      expect(p.record).toBeDefined();
      expect(p.createdAt).toBeTruthy();
      expect(p.updatedAt).toBeTruthy();
      expect(Array.isArray(p.input)).toBe(true);
      expect(Array.isArray(p.output)).toBe(true);
      expect(Array.isArray(p.audioFilters)).toBe(true);
      expect(Array.isArray(p.videoFilters)).toBe(true);
    });
  });

  describe('POST /pipelines', () => {
    describe('given a valid pipeline', () => {
      it('should create a new pipeline', async () => {
        const { status, body } = await request(app.getHttpServer())
          .post('/pipelines')
          .send(pipelineData);
        expect(status).toEqual(201);
        expect(body).toBeDefined();
        expect(body.ingestEndpoint).toBeTruthy();
        expect(body.outputEndpoint).toBeTruthy();
        expect(body._id).toBeTruthy();
        expect(body.streamKey).toBeTruthy();
        expect(Array.isArray(body.input)).toBe(true);
        expect(Array.isArray(body.output)).toBe(true);
        expect(Array.isArray(body.audioFilters)).toBe(true);
        expect(Array.isArray(body.videoFilters)).toBe(true);
        expect(body.record).toBe(false);
      });
    });

    describe('given an invalid pipeline', () => {
      it('should return 400 for empty requests', () => {
        request(app.getHttpServer()).post('/pipelines').expect(400);
      });

      it('should return 400 for an invalid input protocol', () => {
        request(app.getHttpServer())
          .post('/pipelines')
          .send({ ...pipelineData, inputProtocol: 'test' })
          .expect(400);
      });

      it('should return 400 for an invalid output protocol', () => {
        request(app.getHttpServer())
          .post('/pipelines')
          .send({ ...pipelineData, outputProtocol: 'test' })
          .expect(400);
      });
    });
  });

  describe('GET /pipelines/:id', () => {
    describe('given an invalid id', () => {
      it('should return 404', async () => {
        const { status } = await request(app.getHttpServer()).get(
          '/pipelines/test',
        );
        expect(status).toEqual(404);
      });
    });

    describe('given a valid id', () => {
      it('should return the requested pipeline', async () => {
        const pipeline = await pipelineService.create(pipelineData);
        const { status, body } = await request(app.getHttpServer()).get(
          `/pipelines/${pipeline._id}`,
        );
        expect(status).toBe(200);
        expect(body).toBeDefined();
        expect(body._id).toEqual(pipeline._id);
        //expect(body.inputProtocol).toEqual(pipeline.inputProtocol);
        //expect(body.outputProtocol).toEqual(pipeline.outputProtocol);
        expect(body.ingestEndpoint).toEqual(pipeline.ingestEndpoint);
        expect(body.outputEndpoint).toEqual(pipeline.outputEndpoint);
        expect(body.streamKey).toEqual(pipeline.streamKey);
      });
    });
  });

  describe('PATCH /pipeline/:id', () => {
    describe('given an invalid id', () => {
      it('should return 404', async () => {
        const { status } = await request(app.getHttpServer())
          .patch('/pipelines/test')
          .send(pipelineData);
        expect(status).toEqual(404);
      });
      it('should return 400', async () => {
        const { status } = await request(app.getHttpServer()).patch(
          '/pipelines/test',
        );
        expect(status).toEqual(400);
      });
    });
    describe('given a valid id', () => {
      it('should update the pipeline', async () => {
        const pipeline = await pipelineService.create(pipelineData);
        const { status, body } = await request(app.getHttpServer())
          .patch(`/pipelines/${pipeline._id}`)
          .send({ ...pipelineData, record: true });
        expect(status).toEqual(200);
        expect(body).toBeDefined();
        expect(body._id);
        expect(body.record).toBe(true);
      });
    });
  });

  describe('DELETE /pipelines/:id', () => {
    describe('given an invalid id', () => {
      it('should return 404', async () => {
        const { status } = await request(app.getHttpServer()).delete(
          '/pipelines/test',
        );
        expect(status).toEqual(404);
      });
    });

    describe('given a valid id', () => {
      it('should delete the pipeline', async () => {
        const pipeline = await pipelineService.create(pipelineData);

        const { status } = await request(app.getHttpServer()).delete(
          `/pipelines/${pipeline._id}`,
        );
        expect(status).toEqual(200);
        const target = await model.findById(pipeline._id);
        expect(target).toBeNull();
      });
    });
  });
});
