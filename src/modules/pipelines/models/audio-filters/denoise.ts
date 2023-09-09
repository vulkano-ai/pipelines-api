import {
  AudioDenoise,
  AudioFilterName,
  AudioDenoiseConfig,
} from '@inference/inference-proto/nest';
import { Schema, Prop } from '@nestjs/mongoose';
import { JoiSchema, getTypeSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class AudioDenoiseConfigModel implements AudioDenoiseConfig {
  @JoiSchema(Joi.number().min(0).max(1).required())
  @Prop({ type: Number, min: 0, max: 1 })
  strength: number;
}

@Schema()
export class AudioDenoiseModel implements AudioDenoise {
  @JoiSchema(getTypeSchema(AudioDenoiseConfigModel))
  @Prop()
  config: AudioDenoiseConfigModel;
  
  @JoiSchema(Joi.string().valid(AudioFilterName.AUDIO_DENOISE).required())
  @Prop({ type: String, enum: [AudioFilterName.AUDIO_DENOISE] })
  name: AudioFilterName;
}
