import {
  PipelineInput,
  InputProtocol,
  InputProvider,
  PipelineOutput,
  OutputProtocol,
  OutputProvider,
  RtmpProviderConfig,
  HlsProviderConfig,
  HttpMethod,
} from '@inference/inference-proto/nest';
import { JoiSchema, getTypeSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class HlsProviderConfigDto implements HlsProviderConfig {
  @JoiSchema(Joi.string().required())
  uri: string;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(
        ...Object.values(HttpMethod).filter(
          (v) => v !== HttpMethod.UNRECOGNIZED,
        ),
      ),
  )
  method: HttpMethod;
}
export class RtmpProviderConfigDto implements RtmpProviderConfig {
  @JoiSchema(Joi.string().required())
  uri: string;
}

export class PipelineInputDto implements PipelineInput {
  @JoiSchema(
    Joi.string().valid(
      ...Object.values(InputProtocol).filter(
        (v) => v !== InputProtocol.UNRECOGNIZED,
      ),
    ),
  )
  protocol: InputProtocol;
  @JoiSchema(
    Joi.string().valid(
      ...Object.values(InputProvider).filter(
        (v) => v !== InputProvider.UNRECOGNIZED,
      ),
    ),
  )
  providerType: InputProvider;

  @JoiSchema(
    Joi.when('protocol', {
      is: InputProtocol.INPUT_RTMP,
      then: Joi.when('providerType', {
        is: InputProvider.INPUT_INTERNAL,
        then: getTypeSchema(RtmpProviderConfigDto).required(),
        otherwise: Joi.forbidden(),
      }),
      otherwise: Joi.forbidden(),
    }),
  )
  rtmpConfig: RtmpProviderConfigDto | undefined;
}

export class PipelineOutputDto implements PipelineOutput {
  @JoiSchema(
    Joi.string().valid(
      ...Object.values(OutputProtocol).filter(
        (v) => v !== OutputProtocol.UNRECOGNIZED,
      ),
    ),
  )
  protocol: OutputProtocol;
  @JoiSchema(
    Joi.string().valid(
      ...Object.values(OutputProvider).filter(
        (v) => v !== OutputProvider.UNRECOGNIZED,
      ),
    ),
  )
  providerType: OutputProvider;

  @JoiSchema(
    Joi.when('protocol', {
      is: OutputProtocol.OUTPUT_RTMP,
      then: Joi.when('providerType', {
        is: OutputProvider.OUTPUT_INTERNAL,
        then: getTypeSchema(RtmpProviderConfigDto).required(),
        otherwise: Joi.forbidden(),
      }),
      otherwise: Joi.forbidden(),
    }),
  )
  rtmpConfig: RtmpProviderConfigDto | undefined;

  @JoiSchema(
    Joi.when('protocol', {
      is: OutputProtocol.OUTPUT_HLS,
      then: Joi.when('providerType', {
        is: OutputProvider.OUTPUT_INTERNAL,
        then: getTypeSchema(HlsProviderConfigDto).required(),
        otherwise: Joi.forbidden(),
      }),
      otherwise: Joi.forbidden(),
    }),
  )
  hlsConfig: HlsProviderConfigDto | undefined;
}
