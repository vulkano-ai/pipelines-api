import { Injectable } from '@nestjs/common';
import { PipelineDto } from './dto/pipeline.dto';

@Injectable()
export class PipelinesService {
  create(createPipelineDto: PipelineDto) {
    return 'This action adds a new pipeline';
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
