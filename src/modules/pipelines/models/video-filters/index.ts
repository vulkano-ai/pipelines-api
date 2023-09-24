import { Prop, Schema } from '@nestjs/mongoose';
import { VideoFilter } from '@inference/inference-proto/nest';
import { VideoDenoiseModel } from './denoise';
import { VideoSuperResModel } from './super-res';
import { VideoArtifactReductionModel } from './artifact-reduction';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';

@Schema()
export class VideoFilterModel implements VideoFilter {
  @JoiSchema(getTypeSchema(VideoArtifactReductionModel))
  @Prop()
  artifactReduction: VideoArtifactReductionModel | undefined;

  @JoiSchema(getTypeSchema(VideoDenoiseModel))
  @Prop()
  denoise: VideoDenoiseModel | undefined;

  @JoiSchema(getTypeSchema(VideoSuperResModel))
  @Prop()
  superRes: VideoSuperResModel | undefined;
}
