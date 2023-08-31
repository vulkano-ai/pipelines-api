import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { AmqpConfig } from '../../config';
import {
  StartPipelineRequest,
  Pipeline,
} from '@inference/inference-proto/ts';

@Injectable()
export class QueueService {
  private readonly PIPELINES_QUEUE;
  constructor(
    @InjectPinoLogger('Pipelines service')
    private readonly logger: PinoLogger,
    private readonly amqp: AmqpConnection,
    private configService: ConfigService,
  ) {
    const exchanges = configService.get<AmqpConfig>('amqp').exchanges;
    this.PIPELINES_QUEUE = exchanges.pipelines;
  }

  async enqueuePipeline(pipeline: Pipeline) {
    const channel = await this.amqp.connection.createChannel();
    await channel.assertQueue(this.PIPELINES_QUEUE);

    this.logger.info({ pipeline }, 'Enqueueing pipeline');
    const job = StartPipelineRequest.fromPartial({
      user: 'test user',
      pipeline,
    });

    channel.sendToQueue(
      this.PIPELINES_QUEUE,
      Buffer.from(StartPipelineRequest.encode(job).finish()),
    );
  }
}
