import {
  AudioDenoiseFilter,
  AudioFilterName,
  AudioDenoiseFilterConfig,
} from '@livestream-ml/inference-io-proto/nest';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class AudioDenoiseFilterConfigDto implements AudioDenoiseFilterConfig {
  @JoiSchema(Joi.number().min(0).max(1).required())
  strength: number;
}

export class AudioDenoiseFilterDto implements AudioDenoiseFilter {
  @JoiSchema(getTypeSchema(AudioDenoiseFilterConfigDto))
  config: AudioDenoiseFilterConfigDto;
  @JoiSchema(Joi.string().valid(AudioFilterName.AUDIO_DENOISE).required())
  name: AudioFilterName.AUDIO_DENOISE;
}
