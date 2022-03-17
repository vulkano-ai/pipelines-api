import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res, Req,
} from '@nestjs/common';
import { PipelinesService, RedirectBody } from './pipelines.service';
import { PipelineDto } from './dto/pipeline.dto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { Response, Request } from 'express';
import { PipelineQueue } from './pipeline.queue';

@Controller('pipelines')
export class PipelinesController {
  constructor(
    private readonly pipelinesService: PipelinesService,
    @InjectPinoLogger('Pipelines controller')
    private readonly logger: PinoLogger,
    private readonly queueController: PipelineQueue,
  ) {}

  private checkRTMPApp(redirectBody: RedirectBody) {
    if (redirectBody.app !== 'app') {
      throw new Error('Invalid RTMP app');
    }
  }
  @Post('stream-redirect')
  async streamRedirect(
    @Body() redirectBody: RedirectBody,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    try {
      this.logger.info({ redirectBody }, 'Stream redirect received');
      this.checkRTMPApp(redirectBody);

      const pipeline = await this.pipelinesService.findOne({
        streamKey: redirectBody.name,
      });

      await this.queueController.enqueuePipeline({
        id: pipeline.id,
        inputProtocol: 'RTMP',
        outputProtocol: 'RTMP',
        filters: pipeline.filters,
        inputUri: `rtmp://${request.ip}:1935/app/${pipeline.streamKey}`,
        outputUri: `rtmp://${request.ip}:1935/out/${pipeline.privateStreamKey}`,
      });
      response.sendStatus(200);
    } catch (error) {
      this.logger.error(error);
      response.sendStatus(401);
    }
  }

  @Post()
  create(@Body() createPipelineDto: PipelineDto) {
    return this.pipelinesService.create(createPipelineDto);
  }

  @Get()
  findAll() {
    return this.pipelinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelinesService.findOne({});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePipelineDto: PipelineDto) {
    return this.pipelinesService.update(+id, updatePipelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelinesService.remove(+id);
  }
}
