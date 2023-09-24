import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import {
  Pipeline,
  PipelineOutput,
  PipelineInput,
  AudioFilter,
  VideoFilter,
  HttpMethod,
} from '@inference/inference-proto/ts';

import {
  PipelineOutputSchema,
  PipelineInputSchema,
  PipelineOutputDocument,
  PipelineInputDocument,
  PipelineInputModel,
  PipelineOutputModel,
} from './providers';
import { VideoFilterModel } from './video-filters';
import { AudioFilterModel } from './audio-filters';
import { RtmpStreamDocument } from '../../rtmp-stream/models/rtmp-stream';
import { JoiSchema, getTypeSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export type PipelineDocument = PipelineModel & Document;

export type PipelineView = {
  _id: string;
  streamKey: string;
  record: boolean;
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  videoFilters: VideoFilter[];
  audioFilters: AudioFilter[];
};

@Schema({ timestamps: true })
export class PipelineModel implements Pipeline {
  _id: mongoose.Types.ObjectId;

  @JoiSchema(Joi.array().items(getTypeSchema(PipelineInputModel)).required())
  @Prop({
    required: true,
    type: [PipelineInputSchema],
  })
  inputs: PipelineInputDocument[];

  @JoiSchema(Joi.array().items(getTypeSchema(PipelineOutputModel)).required())
  @Prop({
    required: true,
    type: [PipelineOutputSchema],
  })
  outputs: PipelineOutputDocument[];

  @JoiSchema(Joi.array().items(getTypeSchema(VideoFilterModel)))
  @Prop({ required: true })
  videoFilters: VideoFilterModel[];

  @JoiSchema(Joi.array().items(getTypeSchema(AudioFilterModel)))
  @Prop({ required: true })
  audioFilters: AudioFilterModel[];

  @Prop({ type: String, required: true })
  streamKey: string;

  @JoiSchema(Joi.boolean().default(false))
  @Prop({ type: Boolean, required: true, default: false })
  record: boolean;

  view(): PipelineView {
    return {
      _id: this._id.toString(),
      inputs: this.inputs,
      outputs: this.outputs,
      record: this.record,
      streamKey: this.streamKey,
      videoFilters: this.videoFilters,
      audioFilters: this.audioFilters,
    };
  }

  setRtmpStream(stream: RtmpStreamDocument) {
    console.log(this);
    const rtmpInput = this.inputs.findIndex((i) => i.isAnInternalRtmpInput());

    if (!!~rtmpInput) {
      this.inputs[rtmpInput].rtmpConfig = {
        uri: `rtmp://${stream.addr}/app/${this.streamKey}`,
      };
    }
  }

  setHlsOutput(baseUrl: string, streamId: string) {
    const hlsOutput = this.outputs.findIndex((o) => o.isAnInternalHlsOutput());
    console.log(this.outputs);
    console.log(hlsOutput);
    if (!!~hlsOutput) {
      this.outputs[hlsOutput].hlsConfig = {
        uri: `${baseUrl}/hls/${this._id.toString()}/${streamId}`,
        method: HttpMethod.POST,
      };
    }
  }
  getInternalHlsOutput() {
    return this.outputs.find((o) => o.isAnInternalHlsOutput());
  }
}

export const PipelineSchema = SchemaFactory.createForClass(PipelineModel);

PipelineSchema.loadClass(PipelineModel);
