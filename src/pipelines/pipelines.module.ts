import { Module } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { JoiPipeModule, JoiSchemaOptions } from 'nestjs-joi';
import { PipelineModel, PipelineSchema } from './schemas/pipeline.schema';
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
    MongooseModule.forFeature([
      { name: PipelineModel.name, schema: PipelineSchema },
    ]),
  ],
})
export class PipelinesModule {}
