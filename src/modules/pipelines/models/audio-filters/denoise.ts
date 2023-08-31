import {
  AudioDenoiseFilter,
  AudioFilterName,
  AudioDenoiseFilterConfig,
} from '@inference/inference-proto/nest';
import { Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class AudioDenoiseFilterModel implements AudioDenoiseFilter {
  @Prop()
  config: AudioDenoiseFilterConfigModel;
  @Prop({ type: String, enum: [AudioFilterName.AUDIO_DENOISE] })
  name: AudioFilterName;
}

export class AudioDenoiseFilterConfigModel implements AudioDenoiseFilterConfig {
  @Prop({ type: Number, min: 0, max: 1 })
  strength: number;
}
