import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import * as mongoose from 'mongoose';
import { StreamStatus } from '../rtmp-stream.service';

export class RtmpStreamDto {
  @JoiSchema(Joi.string().valid('app'))
  app: string;

  @JoiSchema(Joi.string())
  addr: string;

  @JoiSchema(Joi.string())
  name: string;

  startTs: Date;

  endTs?: Date;

  pipeline!: mongoose.Types.ObjectId;

  status: StreamStatus;
}
