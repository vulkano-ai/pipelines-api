import {
  VideoArtifactReductionFilter,
  VideoArtifactReductionFilterConfig,
  VideoFilterName,
} from '@inference/inference-proto/nest';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class VideoArtifactReductionConfigDto
  implements VideoArtifactReductionFilterConfig
{
  @JoiSchema(Joi.number().min(0).max(1).required())
  strength: number;
}

export class VideoArtifactReductionDto implements VideoArtifactReductionFilter {
  @JoiSchema(Joi.string().valid(VideoFilterName.ARTIFACT_REDUCTION).required())
  name: VideoFilterName.ARTIFACT_REDUCTION;

  @JoiSchema(getTypeSchema(VideoArtifactReductionConfigDto).required())
  config: VideoArtifactReductionConfigDto | undefined;
}
