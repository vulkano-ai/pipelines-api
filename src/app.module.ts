import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { PipelinesModule } from './modules/pipelines/pipelines.module';
import AppConfig, {
  loggerConfigFactory,
  mongoDbConfigFactory,
  multerConfigFactory,
} from './config';
import { HealthCheckController } from './modules/healthcheck/healthcheck.controller';
import { LoggerModule } from 'nestjs-pino';
import { RtmpStreamModule } from './modules/rtmp-stream/rtmp-stream.module';
import { JoiPipeModule } from 'nestjs-joi';
import { QueueModule } from './modules/queue/queue.module';
import { HlsModule } from './modules/hls/hls.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    JoiPipeModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerConfigFactory,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongoDbConfigFactory,
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: loggerConfigFactory,
      inject: [ConfigService],
    }),
    PipelinesModule,
    TerminusModule,
    RtmpStreamModule,
    QueueModule,
    HlsModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
