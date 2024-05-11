import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseFilters
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  PipelineNotFoundExceptionFilter,
  RtmpPipelineNotFoundExceptionFilter,
} from '../pipelines/errors';
import { PipelinesService } from '../pipelines/pipelines.service';
import { QueueService } from '../queue/queue.service';
import { RtmpStreamDto } from './dto/rtmp-stream.dto';
import {
  AlreadyPublishingExceptionFilter,
  RtmpStreamNotFoundExceptionFilter,
  UnknownRtmpAppException,
} from './errors';
import { RtmpStreamService } from './rtmp-stream.service';

@Controller('rtmp-streams')
export class RtmpStreamController {
  constructor(
    private readonly rtmpStreamService: RtmpStreamService,
    @InjectPinoLogger('RTMP Streams controller')
    private readonly logger: PinoLogger,
    @Inject(PipelinesService)
    private pipelineService: PipelinesService,
    @Inject(QueueService)
    private queueService: QueueService,
  ) {}

  private async printRequest(body: Record<string, any>, response: Response) {
    this.logger.info({ body }, 'Debug request received');
    response.sendStatus(200);
  }

  @Get()
  findAll(@MongoQuery() query: MongoQueryModel) {
    return this.rtmpStreamService.find(query);
  }

  @Post('/app/publish')
  @UseFilters(AlreadyPublishingExceptionFilter)
  @UseFilters(RtmpPipelineNotFoundExceptionFilter)
  async onStreamPublish(
    @Body() body: RtmpStreamDto,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    try{
      const addr = request.socket.remoteAddress.replace('::ffff:', '');
      const streamKey = body.name; // streamKey

      this.logger.info(
        { body },
        `Stream redirect received: ${addr}, streamKey: ${streamKey}`,
      );

      const stream = await this.rtmpStreamService.streamConnect(
        streamKey,
        addr,
        body,
      );
      this.logger.info({ stream }, 'Stream created');
      response.sendStatus(200);
    }
    catch(e){
      this.logger.error(e);
      throw new UnknownRtmpAppException();
    }
  }

  @Post('/app/publish_done')
  @UseFilters(RtmpStreamNotFoundExceptionFilter)
  @UseFilters(AlreadyPublishingExceptionFilter)
  @UseFilters(PipelineNotFoundExceptionFilter)
  async onStreamPublishDone(
    @Body() body: RtmpStreamDto,
    @Res() response: Response,
  ) {
    const streamKey = body.name; // streamKey
    const stream = await this.rtmpStreamService.streamDisconnect(streamKey);
    this.logger.info({ stream }, 'Stream disconnected');
    return this.printRequest(body, response);
  }
  @Post('/app/play')
  async onStreamPlay(
    @Body() body: Record<string, any>,
    @Res() response: Response,
  ) {
    return this.printRequest(body, response);
  }
  @Post('/app/play_done')
  async onStreamPlayDone(
    @Body() body: Record<string, any>,
    @Res() response: Response,
  ) {
    return this.printRequest(body, response);
  }
}
