import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { MongoQuery, MongoQueryModel } from 'nest-mongo-query-parser';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PipelineModel } from './models/pipeline';
import { PipelineNotFoundExceptionFilter } from './errors';

@ApiTags('pipelines')
@Controller('pipelines')
export class PipelinesController {
  constructor(
    private readonly pipelinesService: PipelinesService,
    @InjectPinoLogger('Pipelines controller')
    private readonly logger: PinoLogger,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create pipeline' })
  @ApiResponse({
    status: 201,
    description: 'Pipeline created.',
    type: PipelineModel,
  })
  async create(@Body() createPipelineDto: PipelineModel) {
    const pipeline = await this.pipelinesService.create(createPipelineDto);
    return this.pipelinesService.getPipelineView(pipeline);
  }

  @Get()
  @ApiOperation({ summary: 'Find all pipelines' })
  @ApiResponse({
    status: 200,
    description: 'Pipelines found.',
    type: [PipelineModel],
  })
  async findAll(@MongoQuery() query: MongoQueryModel) {
    const { rows, count } = await this.pipelinesService.find(query);

    return {
      count,
      rows: rows.map((p) => this.pipelinesService.getPipelineView(p)),
    };
  }

  @Get(':id')
  @UseFilters(PipelineNotFoundExceptionFilter)
  @ApiOperation({ summary: 'Find pipeline by id' })
  @ApiResponse({
    status: 200,
    description: 'Pipeline found.',
    type: PipelineModel,
  })
  async findOne(@Param('id') id: string) {
    const pipeline = await this.pipelinesService.findOne(id);
    return this.pipelinesService.getPipelineView(pipeline);
  }

  @Patch(':id')
  @UseFilters(PipelineNotFoundExceptionFilter)
  @ApiOperation({ summary: 'Update pipeline by id' })
  @ApiResponse({
    status: 200,
    description: 'Pipeline updated.',
    type: PipelineModel,
  })
  async update(
    @Param('id') id: string,
    @Body() updatePipelineDto: PipelineModel,
  ) {
    const pipeline = await this.pipelinesService.update(id, updatePipelineDto);
    return this.pipelinesService.getPipelineView(pipeline);
  }

  @Delete(':id')
  @UseFilters(PipelineNotFoundExceptionFilter)
  @ApiOperation({ summary: 'Delete pipeline by id' })
  @ApiResponse({
    status: 200,
    description: 'Pipeline deleted.',
    type: PipelineModel,
  })
  async remove(@Param('id') id: string) {
    const deletedPipeline = await this.pipelinesService.remove(id);
    return this.pipelinesService.getPipelineView(deletedPipeline);
  }
}
