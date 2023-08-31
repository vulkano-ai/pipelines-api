import { VideoFilter } from '@inference/inference-proto/nest';
import { VideoDenoiseDto } from './denoise.dto';
import { VideoSuperResolutionDto } from './super-res.dto';
import { VideoArtifactReductionDto } from './artifact-reduction.dto';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';

export class VideoFilterArtifactReductionDto implements VideoFilter {
  @JoiSchema(getTypeSchema(VideoArtifactReductionDto).required())
  artifactReduction: VideoArtifactReductionDto;

  denoise: undefined;

  superResolution: undefined;
}
export class VideoFilterDenoiseDto implements VideoFilter {
  @JoiSchema(getTypeSchema(VideoDenoiseDto).required())
  denoise: VideoDenoiseDto;
  artifactReduction: undefined;

  superResolution: undefined;
}
export class VideoFilterSuperResolutionDto implements VideoFilter {
  @JoiSchema(getTypeSchema(VideoSuperResolutionDto).required())
  superResolution: VideoSuperResolutionDto | undefined;
  artifactReduction: undefined;

  denoise: undefined;
}
