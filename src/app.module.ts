import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelinesModule } from './pipelines/pipelines.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import AppConfig, { mongoDbConfigFactory } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'main',
      useFactory: mongoDbConfigFactory,
      inject: [ConfigService],
    }),
    PipelinesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
