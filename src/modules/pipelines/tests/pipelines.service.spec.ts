import { TestingModule } from '@nestjs/testing';
import { PipelinesService } from '../pipelines.service';
import { getModelToken } from '@nestjs/mongoose';
import { PipelineModel } from '../models/pipeline';
import { Model } from 'mongoose';
import { getPipelineTestModule } from './pipelines.testmodule';
import { MongoQueryFilter } from '../../../common';
import {
  AudioFilterName,
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

describe('PipelinesService', () => {
  let service: PipelinesService;
  let module: TestingModule;
  let model;
  let record;
  beforeEach(async () => {
    module = await getPipelineTestModule().compile();
    model = module.get<Model<PipelineModel>>(getModelToken('Pipeline'));
    service = module.get<PipelinesService>(PipelinesService);
    record = new model(pipelineData);
    await record.save();
  });

  afterEach(async () => {
    await record.remove();
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should correctly retrieve a list of pipelines', async () => {
    const filter: MongoQueryFilter = {
      limit: 1,
      skip: 0,
      select: {},
      sort: {},
      populate: [],
      filter: {},
    };
    const result = await service.find(filter);
    expect(result).toBeDefined();
    const { rows, count } = result;
    expect(rows).toBeDefined();
    expect(Array.isArray(rows)).toEqual(true);
    expect(rows.length === 1).toEqual(true);
    expect(count).toBeDefined();
    expect(Number.isInteger(count)).toEqual(true);
    const pipeline = rows[0];
    expect(pipeline).toBeDefined();
    expect(pipeline.id).toBeDefined();
  });

  describe('Given a valid pipeline', () => {
    it('should correctly create a pipeline', async () => {
      const result = await service.create(pipelineData);
      expect(result).toBeDefined();
      const {
        _id,
        streamKey,
        ingestEndpoint,
        outputEndpoint,
        input,
        output,
        audioFilters,
        videoFilters,
      } = result;
      expect(_id).toBeDefined();
      expect(input).toBeDefined();
      expect(Array.isArray(input)).toEqual(true);
      expect(input[0]).toBeDefined();
      expect(input[0].protocol).toEqual(InputProtocol.INPUT_RTMP);
      expect(input[0].rtmpConfig.uri).toBeDefined();

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toBeDefined();
      expect(output[0].protocol).toEqual(OutputProtocol.OUTPUT_HLS);
      expect(output[0].hlsConfig.uri).toBeDefined();

      expect(streamKey).toBeDefined();
      expect(ingestEndpoint).toBeDefined();
      expect(outputEndpoint).toBeDefined();
      expect(Array.isArray(videoFilters)).toEqual(true);
      expect(Array.isArray(audioFilters)).toEqual(true);
    });

    it('should correctly get the pipeline by ID', async () => {
      const result = await service.findOne(record.id);
      expect(result).toBeDefined();
      expect(result._id).toBeDefined();
      expect(result._id).toEqual(record.id);
    });
    it('should correctly update the pipeline', async () => {
      const result = await service.update(record.id, {
        ...pipelineData,
        audioFilters: [
          {
            denoise: {
              name: AudioFilterName.AUDIO_DENOISE,
              config: { strength: 1 },
            },
          },
        ],
      });
      expect(result).toBeDefined();
      expect(Array.isArray(result.audioFilters)).toEqual(true);
      expect(result.audioFilters.length === 1).toEqual(true);
      expect(result.audioFilters[0].denoise).toBeDefined();
      expect(result.audioFilters[0].denoise.name).toEqual(
        AudioFilterName.AUDIO_DENOISE,
      );
    });
    it('should correctly delete the pipeline', async () => {
      const result = await service.remove(record.id);
      expect(result).toBeDefined();
      expect(result._id).toBeDefined();
      expect(result._id.toString()).toEqual(record.id);
    });
  });

  describe('Given an invalid pipeline id', () => {
    it('should throw an error on findById()', async () => {
      const pipeline = new model(pipelineData);
      await expect(service.findOne(pipeline.id)).rejects.toThrow(Error);
    });
    it('should return an error on update()', async () => {
      const pipeline = new model(pipelineData);
      await expect(service.update(pipeline.id, pipelineData)).rejects.toThrow(
        Error,
      );
    });
    it('should throw an error on delete()', async () => {
      const pipeline = new model(pipelineData);
      await expect(service.remove(pipeline.id)).rejects.toThrow(Error);
    });
  });
});
