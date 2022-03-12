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
  @JoiSchema([CREATE, UPDATE], Joi.string().required())
  inputProtocol!: string;

  @JoiSchema(
    Joi.string()
      .valid(...availableProtocols)
      .required(),
  )
  @JoiSchema([CREATE, UPDATE], Joi.string().required())
  outputProtocol!: string;

  @JoiSchema(
    Joi.array().items(
      Joi.alternatives(getTypeSchema(SuperResolutionFilterDto)),
    ),
  )
  @JoiSchema([CREATE, UPDATE], Joi.array().required())
  filters!: SuperResolutionFilterDto[];
}
