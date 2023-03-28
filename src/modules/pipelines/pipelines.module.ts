import { Module } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { JoiPipeModule, JoiSchemaOptions } from 'nestjs-joi';
import { PipelineSchema } from './models/pipeline';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@JoiSchemaOptions({
  allowUnknown: false,
})
@Module({
  controllers: [PipelinesController],
  providers: [PipelinesService],
  imports: [
    JoiPipeModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Pipeline', schema: PipelineSchema }]),
  ],
  exports: [PipelinesService],
})
export class PipelinesModule {}
