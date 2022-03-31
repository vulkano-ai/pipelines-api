import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Connection } from 'amqplib';

export interface PipelineJob {
  id: string;
  inputProtocol: string;
  outputProtocol: string;
  inputUri: string;
  outputUri: string;
  filters: any;
}

@Injectable()
export class PipelineQueue {
  private readonly QUEUE_NAME = 'pipelines_queue';
  constructor(
    @InjectPinoLogger('Pipelines queue')
    private readonly logger: PinoLogger,

    private configService: ConfigService,
  ) {}

  private async getChannel() {

    return {};
  }
  async enqueuePipeline(job: PipelineJob) {
    return {};
  }
}
