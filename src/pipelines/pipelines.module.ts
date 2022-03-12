import { Module } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { JoiPipeModule, JoiSchemaOptions } from 'nestjs-joi';

@JoiSchemaOptions({
  allowUnknown: false,
})
@Module({
  controllers: [PipelinesController],
  providers: [PipelinesService],
  imports: [JoiPipeModule],
})
export class PipelinesModule {}
