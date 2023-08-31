import { AudioFilter } from '@inference/inference-proto/nest';
import { AudioDenoiseFilterDto } from './denoise';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';

export class AudioFilterDenoiseDto implements AudioFilter {
  @JoiSchema(getTypeSchema(AudioDenoiseFilterDto))
  denoise: AudioDenoiseFilterDto | undefined;
}
