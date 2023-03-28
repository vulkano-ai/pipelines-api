import { Injectable } from '@nestjs/common';
import { PipelineDto } from './dto/pipeline.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PipelineDocument, PipelineView } from './models/pipeline';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { MongoQueryFilter } from '../../common';
import { PipelineNotFoundException } from './errors';
import { RtmpStreamDocument } from '../rtmp-stream/models/rtmp-stream';
import {
  HttpMethod,
  InputProtocol,
  InputProvider,
  OutputProtocol,
  OutputProvider,
  PipelineInput,
  PipelineOutput,
} from '@livestream-ml/inference-io-proto/nest';
import { PipelineOutputModel } from './models/providers';

export type Pipeline = {
  ingestEndpoint: string;
  outputEndpoint: string;
} & PipelineView;

@Injectable()
export class PipelinesService {
  private readonly rtmpServerUri: string;
  private readonly hlsBaseUrl: string;
  constructor(
    @InjectModel('Pipeline')
    private model: Model<PipelineDocument>,
    @InjectPinoLogger('Pipelines service')
    private readonly logger: PinoLogger,

    private configService: ConfigService,
  ) {
    this.rtmpServerUri = this.configService.get('rtmpServerUri');
    this.hlsBaseUrl = this.configService.get('hlsBaseUrl');
  }

  getPipelineView(pipeline: PipelineDocument): Pipeline {
    return {
      ...pipeline.view(),
      ingestEndpoint: `${this.rtmpServerUri}/app`,
      outputEndpoint: `${this.hlsBaseUrl}/${pipeline._id}/master.m3u8`,
    };
  }
  async create(createPipelineDto: PipelineDto): Promise<PipelineDocument> {
    const pipeline = new this.model({
      ...createPipelineDto,
      streamKey: uuidv4(),
    });
    await pipeline.save();
    this.logger.debug({ pipeline }, 'Pipeline created');

    return pipeline;
  }

  async find({ filter, limit, skip, sort, select }: MongoQueryFilter) {
    const count = await this.model.count(filter);
    const rows = await this.model.find(filter, select, {
      limit,
      skip,
      sort,
    });
    return { count, rows };
  }

  async findOne(id: string): Promise<PipelineDocument> {
    const pipeline = await this.model
      .findById(id)
      .catch((err) => this.logger.debug(err)); // cast error
    if (!pipeline) {
      throw new PipelineNotFoundException();
    }
    return pipeline;
  }

  async findByStreamKey(streamKey: string): Promise<PipelineDocument> {
    const pipeline = await this.model.findOne({ streamKey });
    if (!pipeline) {
      throw new PipelineNotFoundException();
    }
    return pipeline;
  }

  async update(
    id: string,
    updatePipelineDto: PipelineDto,
  ): Promise<PipelineDocument> {
    await this.findOne(id);
    const pipeline = await this.model.findByIdAndUpdate(id, updatePipelineDto, {
      upsert: false,
      new: true,
    });

    this.logger.debug({ pipeline }, 'Pipeline updated');
    return pipeline;
  }

  async remove(id: string) {
    const pipeline = await this.findOne(id);
    await this.model.findByIdAndRemove(id);
    return pipeline;
  }

  // update pipeline outputs
  buildPipelineOutputs(pipeline: PipelineDocument, stream: RtmpStreamDocument) {
    pipeline.setHlsOutput(
      this.configService.get('hlsBaseUrl'),
      stream._id.toString(),
    );
  }
}
