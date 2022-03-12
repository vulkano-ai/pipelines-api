import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PipelinesModule } from './pipelines/pipelines.module';
import AppConfig, { mongoDbConfigFactory } from './app.config';
import { HealthCheckController } from './healthcheck/healthcheck.controller';

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
    PipelinesModule,
    TerminusModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
