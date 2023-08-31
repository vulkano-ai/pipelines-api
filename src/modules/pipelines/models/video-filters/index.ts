import { Prop, Schema } from '@nestjs/mongoose';
import { VideoFilter } from '@inference/inference-proto/nest';
import { VideoDenoiseModel } from './denoise';
import { VideoSuperResolutionModel } from './super-res';
import { VideoArtifactReductionFilterModel } from './artifact-reduction';

@Schema()
export class VideoFilterModel implements VideoFilter {
  @Prop()
  artifactReduction: VideoArtifactReductionFilterModel;

  @Prop()
  denoise: VideoDenoiseModel;

  @Prop()
  superResolution: VideoSuperResolutionModel;
}
