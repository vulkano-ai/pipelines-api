import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMqConfigFactory } from '../../config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueService } from './queue.service';

@Module({
  controllers: [],
  providers: [QueueService],
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: rabbitMqConfigFactory,
      inject: [ConfigService],
      exports: [],
    }),
  ],
  exports: [QueueService],
})
export class QueueModule {}
