import { AudioFilter } from '@inference/inference-proto/nest';
import { Schema } from '@nestjs/mongoose';
import { AudioDenoiseModel } from './denoise';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';

@Schema()
export class AudioFilterModel implements AudioFilter {
  @JoiSchema(getTypeSchema(AudioDenoiseModel))
  denoise: AudioDenoiseModel | undefined;
}
