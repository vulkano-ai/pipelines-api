import { JoiSchema, CREATE, UPDATE, getTypeSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import { SuperResolutionFilterDto } from './super-resolution.dto';

const availableProtocols = ['RTMP'];

export class PipelineDto {
  @JoiSchema(
    Joi.string()
      .valid(...availableProtocols)
      .required(),
  )
  inputProtocol!: string;

  @JoiSchema(
    Joi.string()
      .valid(...availableProtocols)
      .required(),
  )
  outputProtocol!: string;

  @JoiSchema(
    Joi.array()
      .min(1)
      .items(
        Joi.alternatives()
          .match('any')
          .try(getTypeSchema(SuperResolutionFilterDto)),
      )
      .required(),
  )
  filters!: SuperResolutionFilterDto[];
}
