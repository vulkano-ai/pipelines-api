import { Inject, Injectable } from '@nestjs/common';
import { RtmpStreamDto } from './dto/rtmp-stream.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RtmpStreamDocument } from './models/rtmp-stream';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { MongoQueryFilter } from '../../common';
import {
  AlreadyPublishingException,
  RtmpStreamNotFoundException,
} from './errors';
import { PipelinesService } from '../pipelines/pipelines.service';
import { QueueService } from '../queue/queue.service';

export enum StreamStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Injectable()
export class RtmpStreamService {
  private readonly rtmpServerUri: string;
  constructor(
    @InjectModel('RtmpStream')
    private model: Model<RtmpStreamDocument>,
    @InjectPinoLogger('RtmpStream service')
    private readonly logger: PinoLogger,

    @Inject(PipelinesService)
    private pipelineService: PipelinesService,

    @Inject(QueueService)
    private queueService: QueueService,

    @Inject(ConfigService)
    private configService: ConfigService,
  ) {
    this.rtmpServerUri = this.configService.get('rtmpServerUri');
  }

  async create(createRtmpStreamDto: RtmpStreamDto) {
    const stream = new this.model(createRtmpStreamDto);
    this.logger.debug({ stream }, 'Stream created');
    await stream.save();
    return stream;
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
  async findOne(id: string): Promise<RtmpStreamDocument> {
    const rtmpStream = await this.model.findById(id);
    if (!rtmpStream) {
      throw new RtmpStreamNotFoundException();
    }
    return rtmpStream;
  }
  async findByStreamKey(streamKey: string): Promise<RtmpStreamDocument> {
    const rtmpStream = await this.model.findOne({ name: streamKey });
    if (!rtmpStream) {
      throw new RtmpStreamNotFoundException();
    }
    return rtmpStream;
  }

  async update(id: string, updateRtmpStreamDto: RtmpStreamDto) {
    const stream = await this.model.findOneAndUpdate(
      { _id: id },
      updateRtmpStreamDto,
      {
        upsert: false,
        new: true,
      },
    );
    if (!stream) {
      throw new RtmpStreamNotFoundException();
    }
    return stream;
  }

  remove(id: number) {
    return `This action removes a #${id} pipeline`;
  }

  async findActiveStream(streamKey: string) {
    return this.model.findOne({
      name: streamKey,
      status: StreamStatus.ACTIVE,
    });
  }
  async streamConnect(
    streamKey: string,
    addr: string,
    body: RtmpStreamDto,
  ): Promise<RtmpStreamDocument> {
    const pipeline = await this.pipelineService.findByStreamKey(streamKey);

    const activeStream = await this.findActiveStream(streamKey);
    if (activeStream) {
      throw new AlreadyPublishingException();
    }
    const stream = await this.create({
      ...body,
      status: StreamStatus.ACTIVE,
      addr,
      startTs: new Date(),
      pipeline: pipeline._id,
    });
    pipeline.setRtmpStream(stream);
    this.pipelineService.buildPipelineOutputs(pipeline, stream);
    await this.queueService.enqueuePipeline(pipeline);

    return stream;
  }

  async streamDisconnect(streamKey): Promise<RtmpStreamDocument> {
    const stream = await this.findActiveStream(streamKey);
    if (!stream) {
      throw new RtmpStreamNotFoundException();
    }
    stream.status = StreamStatus.INACTIVE;
    stream.endTs = new Date();
    await stream.save();
    return stream;
  }
}
