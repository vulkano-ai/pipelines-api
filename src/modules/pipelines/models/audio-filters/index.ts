import { AudioFilter } from '@inference/inference-proto/nest';
import { Schema } from '@nestjs/mongoose';
import { AudioDenoiseFilterModel } from './denoise';

@Schema()
export class AudioFilterModel implements AudioFilter {
  denoise: AudioDenoiseFilterModel | undefined;
}
