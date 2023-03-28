import { Test } from '@nestjs/testing';
import { PipelinesController } from '../pipelines.controller';
import { PipelinesService } from '../pipelines.service';
import { JoiPipeModule } from 'nestjs-joi';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig, {
  loggerConfigFactory,
  mongoDbConfigFactory,
} from '../../../config';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelineSchema } from '../models/pipeline';

export const getPipelineTestModule = () =>
  Test.createTestingModule({
    controllers: [PipelinesController],
    providers: [PipelinesService],
    imports: [
      JoiPipeModule,
      LoggerModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: loggerConfigFactory,
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
      MongooseModule.forFeature([{ name: 'Pipeline', schema: PipelineSchema }]),
    ],
  });
