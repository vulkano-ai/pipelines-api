import {
  VideoDenoiseFilter,
  VideoFilterName,
  VideoDenoiseFilterConfig,
} from '@inference/inference-proto/nest';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class VideoDenoiseConfigDto implements VideoDenoiseFilterConfig {
  @JoiSchema(Joi.number().min(0).max(1).required())
  strength: number;
}

export class VideoDenoiseDto implements VideoDenoiseFilter {
  @JoiSchema(Joi.string().valid(VideoFilterName.VIDEO_DENOISE).required())
  name: VideoFilterName.VIDEO_DENOISE;
  @JoiSchema(getTypeSchema(VideoDenoiseConfigDto).required())
  config: VideoDenoiseConfigDto | undefined;
}
