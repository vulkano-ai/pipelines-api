import { JoiSchema, CREATE, UPDATE, getTypeSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class RtmpStreamDto {
  @JoiSchema(Joi.string())
  app: string;

  @JoiSchema(Joi.string())
  addr: string;

  @JoiSchema(Joi.string())
  name: string;
}
