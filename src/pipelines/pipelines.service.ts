import { Injectable } from '@nestjs/common';
import { PipelineDto } from './dto/pipeline.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PipelineModel, PipelineDocument } from './schemas/pipeline.schema';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { pipe } from 'rxjs';

export interface RedirectBody {
  app: string;
  flashver: string;
  swfurl: string;
  tcurl: string;
  pageurl: string;
  addr: string;
  clientid: string;
  call: string;
  name: string;
  type: string;
}

@Injectable()
export class PipelinesService {
  private readonly rtmpServerUri: string;
  constructor(
    @InjectModel(PipelineModel.name)
    private pipelineModel: Model<PipelineDocument>,
    @InjectPinoLogger('Pipelines service')
    private readonly logger: PinoLogger,
    private configService: ConfigService,
  ) {
    this.rtmpServerUri = this.configService.get('rtmpServerUri');
  }

  async create(createPipelineDto: PipelineDto) {
    const pipeline = new this.pipelineModel({
      ...createPipelineDto,
      streamKey: uuidv4(),
      privateStreamKey: uuidv4(),
    });
    this.logger.debug({ pipeline }, 'Pipeline created');
    await pipeline.save();

    return {
      streamKey: pipeline.streamKey,
      ingestEndpoint: `${this.rtmpServerUri}/app`,
      outputEndpoint: `${this.rtmpServerUri}/out/${pipeline.id}`,
    };
  }

  async publicStreamRedirect(redirectBody: RedirectBody) {
    this.logger.info({ redirectBody });

    if (redirectBody.app !== 'app') {
      return undefined;
    }
    const pipeline = await this.pipelineModel.findOne({
      streamKey: redirectBody.name,
    });
    this.logger.info({ pipeline: pipeline.toJSON() });
    if (!pipeline) {
      throw new Error('Pipeline not found');
    }
    return pipeline;
  }
  findAll() {
    return `This action returns all pipelines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pipeline`;
  }

  update(id: number, updatePipelineDto: PipelineDto) {
    return `This action updates a #${id} pipeline`;
  }

  remove(id: number) {
    return `This action removes a #${id} pipeline`;
  }
}
