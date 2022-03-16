import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { InjectAmqpConnection } from 'nestjs-amqp';
import { Connection } from 'amqplib';

@Injectable()
export class PipelineQueue {
  private readonly QUEUE_NAME = 'pipelines_queue';
  constructor(
    @InjectPinoLogger('Pipelines queue')
    private readonly logger: PinoLogger,
    @InjectAmqpConnection()
    private readonly amqp: Connection,
    private configService: ConfigService,
  ) {}

  private async getChannel() {
    const channel = await this.amqp.createChannel();
    channel.assertQueue(this.QUEUE_NAME);
    return channel;
  }
  async enqueuePipeline(pipeline: Record<string, any>) {
    const channel = await this.getChannel();
    channel.sendToQueue(this.QUEUE_NAME, Buffer.from(JSON.stringify(pipeline)));
  }
}
