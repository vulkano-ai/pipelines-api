import { Module } from '@nestjs/common';
import { RtmpStreamController } from './rtmp-stream.controller';
import { RtmpStreamService } from './rtmp-stream.service';
import { JoiPipeModule } from 'nestjs-joi';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RtmpStreamSchema } from './models/rtmp-stream';
import { PipelinesModule } from '../pipelines/pipelines.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  controllers: [RtmpStreamController],
  providers: [RtmpStreamService],
  imports: [
    JoiPipeModule,
    ConfigModule,
    PipelinesModule,
    QueueModule,
    MongooseModule.forFeature([
      { name: 'RtmpStream', schema: RtmpStreamSchema },
    ]),
  ],
  exports: [RtmpStreamService],
})
export class RtmpStreamModule {}
