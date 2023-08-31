import { Prop, Schema } from '@nestjs/mongoose';
import {
  VideoDenoiseFilter,
  VideoFilterName,
  VideoDenoiseFilterConfig,
} from '@inference/inference-proto/nest';

@Schema()
export class VideoDenoiseConfig implements VideoDenoiseFilterConfig {
  @Prop({ type: Number, max: 1, min: 0 })
  strength: number;
}

@Schema()
export class VideoDenoiseModel implements VideoDenoiseFilter {
  @Prop({ type: VideoFilterName, default: VideoFilterName.VIDEO_DENOISE })
  name: VideoFilterName.VIDEO_DENOISE;

  @Prop()
  config: VideoDenoiseConfig | undefined;
}
