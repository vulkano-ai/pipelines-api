import { Prop, Schema } from '@nestjs/mongoose';
import {
  VideoSuperResolutionFilter,
  VideoFilterName,
  VideoSuperResolutionFilterConfig,
} from '@inference/inference-proto/nest';

@Schema()
export class VideoSuperResolutionConfig
  implements VideoSuperResolutionFilterConfig
{
  @Prop()
  factor: string;

  @Prop()
  strength: number;
}

@Schema()
export class VideoSuperResolutionModel implements VideoSuperResolutionFilter {
  @Prop({ type: VideoFilterName, default: VideoFilterName.SUPER_RESOLUTION })
  name: VideoFilterName.SUPER_RESOLUTION;

  @Prop()
  config: VideoSuperResolutionConfig | undefined;
}
