import { Test } from '@nestjs/testing';
import { RtmpStreamController } from '../rtmp-stream.controller';
import { RtmpStreamService } from '../rtmp-stream.service';
import { JoiPipeModule } from 'nestjs-joi';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig, {
  loggerConfigFactory,
  mongoDbConfigFactory,
} from '../../../config';
import { MongooseModule } from '@nestjs/mongoose';
import { RtmpStreamSchema } from '../models/rtmp-stream';
import { PipelinesModule } from '../../pipelines/pipelines.module';

export const getPipelineTestModule = () =>
  Test.createTestingModule({
    controllers: [RtmpStreamController],
    providers: [RtmpStreamService],
    imports: [
      JoiPipeModule,
      PipelinesModule,
      ConfigModule.forRoot({
        isGlobal: true,
        load: [AppConfig],
      }),
      LoggerModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: loggerConfigFactory,
        inject: [ConfigService],
      }),
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: mongoDbConfigFactory,
        inject: [ConfigService],
      }),
      MongooseModule.forFeature([
        { name: 'RtmpStream', schema: RtmpStreamSchema },
      ]),
    ],
  });
