import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './healthcheck.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { rabbitMqConfigFactory } from '../../config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([]),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: rabbitMqConfigFactory,
      inject: [ConfigService],
    }),
    TerminusModule,
  ],
  controllers: [HealthCheckController],
})
export class HealthcheckModule {}
