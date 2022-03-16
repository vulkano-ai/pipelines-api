import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PipelinesModule } from './pipelines/pipelines.module';
import AppConfig, { mongoDbConfigFactory } from './app.config';
import { HealthCheckController } from './healthcheck/healthcheck.controller';
import { LoggerModule } from 'nestjs-pino';
import { AmqpModule } from 'nestjs-amqp';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongoDbConfigFactory,
      inject: [ConfigService],
    }),
    AmqpModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('amqp'),
      inject: [ConfigService],
    }),
    LoggerModule.forRoot(),
    PipelinesModule,
    TerminusModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
