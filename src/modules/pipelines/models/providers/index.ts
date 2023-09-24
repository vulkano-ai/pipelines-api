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
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { getTypeSchema, JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

function enumValues(enumType: any) {
  return Object.values(enumType).filter((v) => v !== enumType.UNRECOGNIZED);
}
@Schema()
export class HlsProviderConfigModel implements HlsProviderConfig {
  
  @JoiSchema(Joi.string().forbidden())
  @Prop()
  uri: string;

  @JoiSchema(
    Joi.string()
      .required()
      .valid(...enumValues(HttpMethod)),
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
  
  @JoiSchema(Joi.string().valid(InputProtocol.INPUT_RTMP))
  @Prop({ type: String, enum: InputProtocol })
  protocol: InputProtocol;

  @JoiSchema(
    Joi.string()
      .valid(InputProvider.INPUT_INTERNAL)
      .default(InputProvider.INPUT_INTERNAL),
  )
  @Prop({ type: String, enum: InputProvider })
  providerType: InputProvider;

  @JoiSchema(
    Joi.when('protocol', {
      is: InputProtocol.INPUT_RTMP,
      then: Joi.when('providerType', {
        is: InputProvider.INPUT_EXTERNAL,
        then: getTypeSchema(RtmpProviderConfigModel).required(),
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
  @JoiSchema(Joi.string().valid(...enumValues(OutputProtocol)))
  @Prop({ type: String, enum: OutputProtocol })
  protocol: OutputProtocol;

  @JoiSchema(
    Joi.string()
      .valid(...enumValues(OutputProvider))
      .default(OutputProvider.OUTPUT_INTERNAL),
  )
  @Prop({ type: String, enum: OutputProvider })
  providerType: OutputProvider;

  @JoiSchema(
    Joi.when('protocol', {
      is: OutputProtocol.OUTPUT_RTMP,
      then: Joi.when('providerType', {
        is: OutputProvider.OUTPUT_INTERNAL,
        then: getTypeSchema(RtmpProviderConfigModel).required(),
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
        then: getTypeSchema(HlsProviderConfigModel).required(),
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
