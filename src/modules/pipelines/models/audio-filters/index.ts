import { AudioFilter } from '@livestream-ml/inference-io-proto/nest';
import { Schema } from '@nestjs/mongoose';
import { AudioDenoiseFilterModel } from './denoise';

@Schema()
export class AudioFilterModel implements AudioFilter {
  denoise: AudioDenoiseFilterModel | undefined;
}
