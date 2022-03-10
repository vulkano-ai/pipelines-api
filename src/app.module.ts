import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelinesModule } from './pipelines/pipelines.module';
import { config } from './app.config';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUri), PipelinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
