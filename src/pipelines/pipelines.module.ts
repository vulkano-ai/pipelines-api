import { Module } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { JoiPipeModule, JoiSchemaOptions } from 'nestjs-joi';
import { PipelineModel, PipelineSchema } from './schemas/pipeline.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmqpModule } from 'nestjs-amqp';
import { PipelineQueue } from './pipeline.queue';

@JoiSchemaOptions({
  allowUnknown: false,
})
@Module({
  controllers: [PipelinesController],
  providers: [PipelinesService, PipelineQueue],
  imports: [
    JoiPipeModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: PipelineModel.name, schema: PipelineSchema },
    ]),
    AmqpModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('amqp'),
      inject: [ConfigService],
    }),
  ],
})
export class PipelinesModule {}
