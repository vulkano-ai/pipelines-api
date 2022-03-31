import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Request, Response } from 'express';
import { RtmpStreamDto } from './dto/rtmp-stream.dto';
import { RtmpStreamService, StreamStatus } from './rtmp-stream.service';
import { Connection } from 'amqplib';
import { InjectModel } from '@nestjs/mongoose';
import {
  VideoFilter,
  VideoFilterName,
  VideoSuperResolutionFilterConfig,
} from './proto/pipeline/video-filters/video-filters';
import {
  CreatePipelineRequest,
  InputProtocol,
  InputProvider,
  OutputProvider,
  OutputProtocol,
  RtmpProviderConfig,
} from './proto/pipeline/pipeline';
import {
  PipelineDocument,
  PipelineModel,
} from '../pipelines/schemas/pipeline.schema';
import {
  RtmpStreamDocument,
  RtmpStreamModel,
} from './schemas/rtmp-stream.schema';
import { Model } from 'mongoose';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('rtmp-stream')
export class RtmpStreamController {
  private readonly QUEUE_NAME = 'pipelines_queue';

  constructor(
    private readonly rtmpStreamService: RtmpStreamService,
    @InjectPinoLogger('RTMP Streams controller')
    private readonly logger: PinoLogger,
    private readonly connection: AmqpConnection,
    @InjectModel(PipelineModel.name)
    private pipelineModel: Model<PipelineDocument>,
    @InjectModel(RtmpStreamModel.name)
    private rtmpStreamModel: Model<RtmpStreamDocument>,
  ) {}

  private checkRTMPApp(body: Record<string, any>) {
    if (body.app !== 'app') {
      throw new Error('Invalid RTMP app');
    }
  }
  async enqueuePipeline(pipeline: PipelineDocument, serverIp: string) {
    const channel = await this.connection.connection.createChannel();
    await channel.assertQueue(this.QUEUE_NAME);

    const job = CreatePipelineRequest.fromJSON({
      inputProtocol: InputProtocol.INPUT_RTMP,
      outputProtocol: OutputProtocol.OUTPUT_RTMP,
      inputProvider: InputProvider.INPUT_INTERNAL,
      outputProvider: OutputProvider.OUTPUT_EXTERNAL,
      inputRtmp: {
        //uri: `rtmp://192.168.1.9:1935/app/${pipeline.streamKey}`,
        uri: `rtmp://${serverIp}:1935/app/${pipeline.streamKey}`,
      },
      outputRtmp: {
        //uri: `rtmp://192.168.1.9:1935/out/${pipeline.privateStreamKey}`,
        uri: `rtmp://${serverIp}:1935/out/${pipeline.privateStreamKey}`,
      },
      videoFilters: {
        superResolution: {
          name: VideoFilterName.SUPER_RESOLUTION,
          config: {
            factor: pipeline.filters[0].config.factor,
            strength: pipeline.filters[0].config.strength,
          },
        },
      },
      userId: 'test',
    });
    setTimeout(() => {
      channel.sendToQueue(
        this.QUEUE_NAME,
        Buffer.from(CreatePipelineRequest.encode(job).finish()),
      );
    }, 5000);

  }
  @Get('/')
  async getStreams() {
    return this.rtmpStreamService.findAll();
  }

  @Post('/app/publish')
  async onStreamPublish(
    @Body() body: RtmpStreamDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    try {
      this.logger.info({ body }, 'Stream redirect received');
      this.checkRTMPApp(body);

      const pipeline = await this.pipelineModel.findOne({
        streamKey: body.name,
      });
      let stream = await this.rtmpStreamService.findOne({ name: body.name });
      if (!stream) {
        stream = await this.rtmpStreamService.create(body);
      }
      await this.rtmpStreamService.update(stream.id, {
        status: StreamStatus.ACTIVE,
        addr: body.addr,
      });
      this.logger.info({ stream }, 'Stream created');

      await this.enqueuePipeline(pipeline, body.addr);
      response.sendStatus(200);
    } catch (error) {
      this.logger.error(error);
      response.sendStatus(401);
    }
  }

  async printRequest(body: Record<string, any>, response: Response) {
    this.logger.info({ body }, 'Debug request received');
    response.sendStatus(200);
  }

  @Post('/app/publish_done')
  async onStreamPublishDone(
    @Body() body: RtmpStreamDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const stream = await this.rtmpStreamService.findOne({ name: body.name });
    await this.rtmpStreamService.update(stream.id, {
      status: StreamStatus.INACTIVE,
    });
    this.logger.info({ stream }, 'Stream disconnected');
    return this.printRequest(body, response);
  }
  @Post('/app/play')
  async onStreamPlay(
    @Body() body: Record<string, any>,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.printRequest(body, response);
  }
  @Post('/app/play_done')
  async onStreamPlayDone(
    @Body() body: Record<string, any>,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return this.printRequest(body, response);
  }
}
