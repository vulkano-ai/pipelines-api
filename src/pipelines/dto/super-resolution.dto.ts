import { CREATE, getTypeSchema, JoiSchema, UPDATE } from 'nestjs-joi';
import * as Joi from 'joi';

class SuperResolutionFilterConfigDto {
  @JoiSchema(Joi.string().valid('4/3', '3/2', '2', '3', '4'))
  @JoiSchema([CREATE, UPDATE], Joi.string().required())
  factor!: string;

  @JoiSchema(Joi.string().valid('4/3', '3/2', '2', '3', '4'))
  @JoiSchema([CREATE, UPDATE], Joi.number().min(0).max(1).required())
  strength!: number;
}
export class SuperResolutionFilterDto {
  @JoiSchema(Joi.string().valid('SR'))
  @JoiSchema([CREATE], Joi.string().required())
  @JoiSchema([UPDATE], Joi.string().required())
  name!: string;

  @JoiSchema(getTypeSchema(SuperResolutionFilterConfigDto))
  config!: SuperResolutionFilterConfigDto;
}
