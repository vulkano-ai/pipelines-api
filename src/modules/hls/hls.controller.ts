import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
  UploadedFile,
  UseFilters,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { HlsService } from './hls.service';
import { CreateHlDto } from './dto/create-hl.dto';
import { UpdateHlDto } from './dto/update-hl.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { PipelinesService } from '../pipelines/pipelines.service';
import { RtmpStreamService } from '../rtmp-stream/rtmp-stream.service';
import { PipelineNotFoundExceptionFilter } from '../pipelines/errors';
import { RtmpStreamNotFoundExceptionFilter } from '../rtmp-stream/errors';
import { WrongPipelineOutputException } from './errors';

@ApiTags('hls')
@Controller('hls')
export class HlsController {
  constructor(
    private readonly hlsService: HlsService,

    @InjectPinoLogger('Hls controller')
    private readonly logger: PinoLogger,

    @Inject(PipelinesService)
    private pipelineService: PipelinesService,

    @Inject(RtmpStreamService)
    private rtmpService: RtmpStreamService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @UseFilters(PipelineNotFoundExceptionFilter)
  @UseFilters(RtmpStreamNotFoundExceptionFilter)
  @UseFilters(WrongPipelineOutputException)
  @Post('/:pipelineId/:streamId/playlist.m3u8')
  createPlaylist(
    @Param('pipelineId') pipelineId: string,
    @Param('streamId') streamId: string,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.hlsService.createHlsPlaylist(pipelineId, streamId, file);
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseFilters(PipelineNotFoundExceptionFilter)
  @UseFilters(RtmpStreamNotFoundExceptionFilter)
  @UseFilters(WrongPipelineOutputException)
  @Post('/:pipelineId/:streamId/:rendition/:segment')
  createSegment(
    @Param('pipelineId') pipelineId: string,
    @Param('streamId') streamId: string,
    @Param('rendition') rendition: string,
    @Param('segment') segment: string,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    return;
  }

  @Get('/:pipelineId/:streamId/playlist.m3u8')
  @UseFilters(PipelineNotFoundExceptionFilter)
  @UseFilters(RtmpStreamNotFoundExceptionFilter)
  getPlaylist(
    @Param('pipelineId') pipelineId: string,
    @Param('streamId') streamId: string,
  ) {
    return this.hlsService.findAll();
  }

  @Get('/:pipelineId/:streamId/:rendition/:segment')
  @UseFilters(PipelineNotFoundExceptionFilter)
  @UseFilters(RtmpStreamNotFoundExceptionFilter)
  getSegment(
    @Param('pipelineId') pipelineId: string,
    @Param('streamId') streamId: string,
    @Param('rendition') rendition: string,
    @Param('segment') segment: string,
  ) {
    return this.hlsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hlsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHlDto: UpdateHlDto) {
    return this.hlsService.update(+id, updateHlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hlsService.remove(+id);
  }
}
