import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

class SuperResolutionFilterConfigDto {
  @JoiSchema(Joi.string().valid('4/3', '3/2', '2', '3', '4').required())
  factor!: string;

  @JoiSchema(Joi.number().min(0).max(1).required())
  strength!: number;
}
class ArtifactReductionFilterConfigDto {
  @JoiSchema(Joi.number().min(0).max(1).required())
  mode!: number;
}
export class FilterDto {
  @JoiSchema(Joi.string().valid('SR', 'AR').required())
  name!: string;

  @JoiSchema(
    Joi.alternatives()
      .match('all')
      .try(
        Joi.when('name', {
          is: 'SR',
          then: Joi.valid(getTypeSchema(SuperResolutionFilterConfigDto)),
        }),
      )
      .try(
        Joi.when('name', {
          is: 'AR',
          then: Joi.valid(getTypeSchema(ArtifactReductionFilterConfigDto)),
        }),
      )
      .required(),
  )
  config!: Record<string, any>;
}
