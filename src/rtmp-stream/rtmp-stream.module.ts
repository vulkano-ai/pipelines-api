import { Module } from '@nestjs/common';
import { RtmpStreamController } from './rtmp-stream.controller';
import { RtmpStreamService } from './rtmp-stream.service';
import { JoiPipeModule } from 'nestjs-joi';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RtmpStreamModel,
  RtmpStreamSchema,
} from './schemas/rtmp-stream.schema';
import {
  PipelineModel,
  PipelineSchema,
} from '../pipelines/schemas/pipeline.schema';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import Config from '../app.config';

const config = Config();

@Module({
  controllers: [RtmpStreamController],
  providers: [RtmpStreamService],
  imports: [
    JoiPipeModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: RtmpStreamModel.name, schema: RtmpStreamSchema },
      { name: PipelineModel.name, schema: PipelineSchema },
    ]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: config.rabbitMqUri,
      connectionInitOptions: { wait: false },
    }),
  ],
})
export class RtmpStreamModule {}
