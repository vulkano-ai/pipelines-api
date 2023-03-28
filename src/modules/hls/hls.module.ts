import { Module } from '@nestjs/common';
import { HlsService } from './hls.service';
import { HlsController } from './hls.controller';
import { ConfigModule } from '@nestjs/config';
import { PipelinesModule } from '../pipelines/pipelines.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HlsSchema } from './models/hls';
import { RtmpStreamModule } from '../rtmp-stream/rtmp-stream.module';

@Module({
  controllers: [HlsController],
  providers: [HlsService],
  imports: [
    ConfigModule,
    PipelinesModule,
    RtmpStreamModule,
    MongooseModule.forFeature([{ name: 'HlsPlaylist', schema: HlsSchema }]),
  ],
})
export class HlsModule {}
