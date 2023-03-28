import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Request, Response } from 'express';
import { RtmpStreamDto } from './dto/rtmp-stream.dto';
import { RtmpStreamService, StreamStatus } from './rtmp-stream.service';
import { PipelinesService } from '../pipelines/pipelines.service';
import {
  AlreadyPublishingExceptionFilter,
  RtmpStreamNotFoundExceptionFilter,
  UnknownRtmpAppException,
} from './errors';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import mongoose from 'mongoose';
import { QueueService } from '../queue/queue.service';
import {
  PipelineNotFoundExceptionFilter,
  RtmpPipelineNotFoundExceptionFilter,
} from '../pipelines/errors';

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
