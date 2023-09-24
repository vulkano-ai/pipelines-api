import { Prop, Schema } from '@nestjs/mongoose';
import {
  VideoDenoise,
  VideoFilterName,
  VideoDenoiseConfig,
} from '@inference/inference-proto/nest';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
@Schema()
export class VideoDenoiseConfigModel implements VideoDenoiseConfig {
  @JoiSchema(Joi.number().min(0).max(1).required())
  @Prop({ type: Number, max: 1, min: 0 })
  strength: number;
}

@Schema()
export class VideoDenoiseModel implements VideoDenoise {
  @JoiSchema(Joi.string().valid(VideoFilterName.VIDEO_DENOISE).required())
  @Prop({ type: VideoFilterName, default: VideoFilterName.VIDEO_DENOISE })
  name: VideoFilterName.VIDEO_DENOISE;

  @JoiSchema(getTypeSchema(VideoDenoiseConfigModel).required())
  @Prop({ type: VideoDenoiseConfigModel })
  config: VideoDenoiseConfigModel | undefined;
}
