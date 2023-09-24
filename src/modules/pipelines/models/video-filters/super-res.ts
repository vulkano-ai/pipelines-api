import { Prop, Schema } from '@nestjs/mongoose';
import {
  VideoSuperRes,
  VideoFilterName,
  VideoSuperResConfig,
} from '@inference/inference-proto/nest';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

@Schema()
export class VideoSuperResConfigModel implements VideoSuperResConfig {
  @JoiSchema(Joi.string().valid('4/3', '3/2', '2', '3', '4').required())
  @Prop()
  factor: string;

  @JoiSchema(Joi.number().min(0).max(1).required())
  @Prop()
  strength: number;
}

@Schema()
export class VideoSuperResModel implements VideoSuperRes {
  @JoiSchema(Joi.string().valid(VideoFilterName.SUPER_RESOLUTION).required())
  @Prop({ type: VideoFilterName, default: VideoFilterName.SUPER_RESOLUTION })
  name: VideoFilterName.SUPER_RESOLUTION;

  @JoiSchema(getTypeSchema(VideoSuperResConfigModel).required())
  @Prop({ type: VideoSuperResConfigModel })
  config: VideoSuperResConfigModel | undefined;
}
