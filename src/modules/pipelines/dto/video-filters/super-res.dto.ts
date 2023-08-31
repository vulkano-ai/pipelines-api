import {
  VideoSuperResolutionFilter,
  VideoFilterName,
  VideoSuperResolutionFilterConfig,
} from '@inference/inference-proto/nest';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class VideoSuperResolutionConfigDto
  implements VideoSuperResolutionFilterConfig
{
  @JoiSchema(Joi.string().valid('4/3', '3/2', '2', '3', '4').required())
  factor: string;

  @JoiSchema(Joi.number().min(0).max(1).required())
  strength: number;
}

export class VideoSuperResolutionDto implements VideoSuperResolutionFilter {
  @JoiSchema(Joi.string().valid(VideoFilterName.SUPER_RESOLUTION).required())
  name: VideoFilterName.SUPER_RESOLUTION;

  @JoiSchema(getTypeSchema(VideoSuperResolutionDto).required())
  config: VideoSuperResolutionConfigDto | undefined;
}
