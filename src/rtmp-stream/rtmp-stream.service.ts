import { Injectable } from '@nestjs/common';
import { RtmpStreamDto } from './dto/rtmp-stream.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RtmpStreamModel,
  RtmpStreamDocument,
} from './schemas/rtmp-stream.schema';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'amqplib';

export enum StreamStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Injectable()
export class RtmpStreamService {
  private readonly rtmpServerUri: string;
  constructor(
    @InjectModel(RtmpStreamModel.name)
    private rtmpStreamModel: Model<RtmpStreamDocument>,
    @InjectPinoLogger('RtmpStream service')
    private readonly logger: PinoLogger,
    private configService: ConfigService,
  ) {
    this.rtmpServerUri = this.configService.get('rtmpServerUri');
  }

  async create(createRtmpStreamDto: RtmpStreamDto) {
    const stream = new this.rtmpStreamModel({
      ...createRtmpStreamDto,
      status: StreamStatus.INACTIVE,
    });
    this.logger.debug({ stream }, 'Stream created');
    await stream.save();
    return stream;
  }

  async findAll() {
    return this.rtmpStreamModel.find();
  }
  async findOne(filter: Record<string, any>): Promise<RtmpStreamDocument> {
    return this.rtmpStreamModel.findOne(filter);
  }

  async update(id: string, update: Record<string, any>) {
    return this.rtmpStreamModel.findOneAndUpdate({ _id: id }, update);
  }

  remove(id: number) {
    return `This action removes a #${id} pipeline`;
  }
}
