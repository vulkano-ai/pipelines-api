import { Inject, Injectable } from '@nestjs/common';
import { CreateHlDto } from './dto/create-hl.dto';
import { UpdateHlDto } from './dto/update-hl.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { HlsDocument } from './models/hls';
import { PipelinesService } from '../pipelines/pipelines.service';
import {
  RtmpStreamService,
  StreamStatus,
} from '../rtmp-stream/rtmp-stream.service';
import { RtmpStreamNotFoundException } from '../rtmp-stream/errors';
import {
  OutputProtocol,
  OutputProvider,
  PipelineOutput,
} from '@livestream-ml/inference-io-proto/nest';
import { WrongPipelineOutputException } from './errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HlsService {
  constructor(
    @InjectModel('HlsPlaylist')
    private model: Model<HlsDocument>,
    @InjectPinoLogger('Hls service')
    private readonly logger: PinoLogger,

    @Inject(PipelinesService)
    private pipelineService: PipelinesService,

    @Inject(RtmpStreamService)
    private rtmpService: RtmpStreamService,
    @Inject(ConfigService)
    private config: ConfigService,
  ) {}
  create(createHlDto: CreateHlDto) {
    return 'This action adds a new hl';
  }

  findAll() {
    return `This action returns all hls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hl`;
  }

  update(id: number, updateHlDto: UpdateHlDto) {
    return `This action updates a #${id} hl`;
  }

  remove(id: number) {
    return `This action removes a #${id} hl`;
  }

  private findRtmpStream(pipelineId: string, streamId: string) {
    return this.rtmpService
      .find({
        filter: {
          _id: streamId,
          pipeline: pipelineId,
          status: StreamStatus.ACTIVE,
        },
        limit: 1,
        skip: 0,
      })
      .then((s) => s[0]);
  }

  private async findOrCreatePlaylist(
    pipelineId,
    streamId,
  ): Promise<HlsDocument> {
    const existing = await this.model
      .find(
        {
          pipeline: pipelineId,
          rtmpStream: streamId,
        },
        {},
        { limit: 1 },
      )
      .then((h) => h[0]);

    if (existing) {
      return existing;
    } else {
      const playlist = new this.model({
        pipeline: pipelineId,
        rtmpStream: streamId,
      });
      await playlist.save();
      return playlist;
    }
  }
  async createHlsPlaylist(
    pipelineId: string,
    streamId: string,
    file: Express.Multer.File,
  ) {
    const stream = await this.findRtmpStream(pipelineId, streamId);
    if (!stream) {
      throw new RtmpStreamNotFoundException();
    }

    const pipeline = await this.pipelineService.findOne(pipelineId);
    if (!pipeline) {
      throw new WrongPipelineOutputException();
    }

    const hlsPlaylist = await this.findOrCreatePlaylist(pipelineId, streamId);

    console.log(file, hlsPlaylist, pipeline, stream);
  }
}
