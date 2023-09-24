import { Prop, Schema } from '@nestjs/mongoose';
import {
  VideoArtifactReduction,
  VideoArtifactReductionConfig,
  VideoFilterName,
} from '@inference/inference-proto/nest';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

@Schema()
export class VideoArtifactReductionConfigModel
  implements VideoArtifactReductionConfig
{
  @JoiSchema(Joi.number().min(0).max(1).required())
  @Prop()
  strength: number;
}

@Schema()
export class VideoArtifactReductionModel implements VideoArtifactReduction {
  @JoiSchema(Joi.string().valid(VideoFilterName.ARTIFACT_REDUCTION).required())
  @Prop({ type: VideoFilterName, default: VideoFilterName.ARTIFACT_REDUCTION })
  name: VideoFilterName.ARTIFACT_REDUCTION;

  @JoiSchema(getTypeSchema(VideoArtifactReductionConfigModel).required())
  @Prop()
  config: VideoArtifactReductionConfigModel;
}
