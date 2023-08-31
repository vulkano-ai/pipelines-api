import { Prop, Schema } from '@nestjs/mongoose';
import {
  VideoArtifactReductionFilter,
  VideoArtifactReductionFilterConfig,
  VideoFilterName,
} from '@inference/inference-proto/nest';

@Schema()
export class VideoArtifactReductionFilterConfigModel
  implements VideoArtifactReductionFilterConfig
{
  @Prop()
  strength: number;
}

@Schema()
export class VideoArtifactReductionFilterModel
  implements VideoArtifactReductionFilter
{
  @Prop({ type: VideoFilterName, default: VideoFilterName.ARTIFACT_REDUCTION })
  name: VideoFilterName.ARTIFACT_REDUCTION;

  @Prop()
  config: VideoArtifactReductionFilterConfigModel;
}
