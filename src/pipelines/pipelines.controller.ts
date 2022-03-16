import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PipelinesService, RedirectBody } from './pipelines.service';
import { PipelineDto } from './dto/pipeline.dto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { Response } from 'express';

@Controller('pipelines')
export class PipelinesController {
  constructor(
    private readonly pipelinesService: PipelinesService,
    @InjectPinoLogger('Pipelines controller')
    private readonly logger: PinoLogger,
  ) {}

  @Post('stream-redirect')
  async streamRedirect(
    @Body() redirectBody: RedirectBody,
    @Res() response: Response,
  ) {
    try {
      this.logger.info({ redirectBody }, 'Stream redirect received');
      const pipeline = await this.pipelinesService.publicStreamRedirect(
        redirectBody,
      );
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
    return this.pipelinesService.findOne(+id);
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
