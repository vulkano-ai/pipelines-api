import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelineDto } from './dto/pipeline.dto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { PipelineQueue } from './pipeline.queue';

@Controller('pipelines')
export class PipelinesController {
  constructor(
    private readonly pipelinesService: PipelinesService,
    @InjectPinoLogger('Pipelines controller')
    private readonly logger: PinoLogger,
    private readonly queueController: PipelineQueue,
  ) {}

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
