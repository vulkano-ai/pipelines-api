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
} from '@livestream-ml/inference-io-proto/nest';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';
import {
  HlsProviderConfigDto,
  RtmpProviderConfigDto,
} from '../../dto/providers';

@Schema()
export class HlsProviderConfigModel implements HlsProviderConfig {
  @JoiSchema(Joi.string().required())
  @Prop()
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
  @Prop({ type: String, enum: HttpMethod })
  method: HttpMethod;
}
@Schema()
export class RtmpProviderConfigModel implements RtmpProviderConfig {
  @JoiSchema(Joi.string().required())
  @Prop({ type: String, required: true })
  uri: string;
}

@Schema()
export class PipelineInputModel implements PipelineInput {
  @JoiSchema(
    Joi.string().valid(
      ...Object.values(InputProtocol).filter(
        (v) => v !== InputProtocol.UNRECOGNIZED,
      ),
    ),
  )
  @Prop({ type: String, enum: InputProtocol })
  protocol: InputProtocol;

  @JoiSchema(
    Joi.string()
      .valid(
        ...Object.values(InputProvider).filter(
          (v) => v !== InputProvider.UNRECOGNIZED,
        ),
      )
      .default(InputProvider.INPUT_INTERNAL),
  )
  @Prop({ type: String, enum: InputProvider })
  providerType: InputProvider;

  @JoiSchema(
    Joi.when('protocol', {
      is: InputProtocol.INPUT_RTMP,
      then: Joi.when('providerType', {
        is: InputProvider.INPUT_EXTERNAL,
        then: getTypeSchema(RtmpProviderConfigDto).required(),
        otherwise: Joi.forbidden(),
      }),
      otherwise: Joi.forbidden(),
    }),
  )
  @Prop()
  rtmpConfig: RtmpProviderConfigModel | undefined;

  isAnInternalRtmpInput() {
    return (
      this.protocol === InputProtocol.INPUT_RTMP &&
      this.providerType === InputProvider.INPUT_INTERNAL
    );
  }
}

@Schema()
export class PipelineOutputModel implements PipelineOutput {
  @JoiSchema(
    Joi.string().valid(
      ...Object.values(OutputProtocol).filter(
        (v) => v !== OutputProtocol.UNRECOGNIZED,
      ),
    ),
  )
  @Prop({ type: String, enum: OutputProtocol })
  protocol: OutputProtocol;

  @JoiSchema(
    Joi.string()
      .valid(
        ...Object.values(OutputProvider).filter(
          (v) => v !== OutputProvider.UNRECOGNIZED,
        ),
      )
      .default(OutputProvider.OUTPUT_INTERNAL),
  )
  @Prop({ type: String, enum: OutputProvider })
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
  @Prop()
  rtmpConfig: RtmpProviderConfigModel | undefined;

  @JoiSchema(
    Joi.when('protocol', {
      is: OutputProtocol.OUTPUT_HLS,
      then: Joi.when('providerType', {
        is: OutputProvider.OUTPUT_EXTERNAL,
        then: getTypeSchema(HlsProviderConfigDto).required(),
        otherwise: Joi.forbidden(),
      }),
      otherwise: Joi.forbidden(),
    }),
  )
  @Prop()
  hlsConfig: HlsProviderConfigModel | undefined;

  isAnInternalHlsOutput() {
    return (
      this.providerType === OutputProvider.OUTPUT_INTERNAL &&
      this.protocol === OutputProtocol.OUTPUT_HLS
    );
  }
}

export const PipelineInputSchema =
  SchemaFactory.createForClass(PipelineInputModel);
PipelineInputSchema.loadClass(PipelineInputModel);

export const PipelineOutputSchema =
  SchemaFactory.createForClass(PipelineOutputModel);
PipelineOutputSchema.loadClass(PipelineOutputModel);

export type PipelineInputDocument = PipelineInputModel & Document;
export type PipelineOutputDocument = PipelineOutputModel & Document;
