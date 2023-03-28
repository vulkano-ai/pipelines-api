import { JoiSchema, getTypeSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import {
  AudioFilter,
  Pipeline,
  VideoFilter,
} from '@livestream-ml/inference-io-proto/nest';
import {
  VideoFilterArtifactReductionDto,
  VideoFilterDenoiseDto,
  VideoFilterSuperResolutionDto,
} from './video-filters';
import { PipelineInputModel, PipelineOutputModel } from '../models/providers';
import { AudioFilterDenoiseDto } from './audio-filters';

export class PipelineDto implements Pipeline {
  @JoiSchema(
    Joi.array()
      .items(Joi.alternatives(getTypeSchema(AudioFilterDenoiseDto)))
      .required(),
  )
  audioFilters: AudioFilter[];

  @JoiSchema(Joi.array().items(getTypeSchema(PipelineInputModel)).required())
  input: PipelineInputModel[];

  @JoiSchema(Joi.array().items(getTypeSchema(PipelineOutputModel)).required())
  output: PipelineOutputModel[];

  @JoiSchema(
    Joi.array()
      .items(
        Joi.alternatives(
          getTypeSchema(VideoFilterArtifactReductionDto),
          getTypeSchema(VideoFilterDenoiseDto),
          getTypeSchema(VideoFilterSuperResolutionDto),
        ),
      )
      .required(),
  )
  videoFilters: VideoFilter[];

  @JoiSchema(Joi.boolean().default(false).optional())
  record: boolean;
}
