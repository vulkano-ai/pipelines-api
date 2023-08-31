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
} from '@inference/inference-proto/nest';

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

export type PipelineDocument = PipelineModel & Document;

export type PipelineView = {
  _id: string;
  streamKey: string;
  record: boolean;
  input: PipelineInput[];
  output: PipelineOutput[];
  videoFilters: VideoFilter[];
  audioFilters: AudioFilter[];
};

@Schema({ timestamps: true })
export class PipelineModel implements Pipeline {
  _id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: [PipelineInputSchema],
  })
  input: PipelineInputDocument[];

  @Prop({
    required: true,
    type: [PipelineOutputSchema],
  })
  output: PipelineOutputDocument[];

  @Prop({ required: true })
  videoFilters: VideoFilterModel[];

  @Prop({ required: true })
  audioFilters: AudioFilterModel[];

  @Prop({ type: String, required: true })
  streamKey: string;

  @Prop({ type: Boolean, required: true, default: false })
  record: boolean;

  view(): PipelineView {
    return {
      _id: this._id.toString(),
      input: this.input,
      output: this.output,
      record: this.record,
      streamKey: this.streamKey,
      videoFilters: this.videoFilters,
      audioFilters: this.audioFilters,
    };
  }

  setRtmpStream(stream: RtmpStreamDocument) {
    console.log(this);
    const rtmpInput = this.input.findIndex((i) => i.isAnInternalRtmpInput());

    if (!!~rtmpInput) {
      this.input[rtmpInput].rtmpConfig = {
        uri: `rtmp://${stream.addr}/app/${this.streamKey}`,
      };
    }
  }

  setHlsOutput(baseUrl: string, streamId: string) {
    const hlsOutput = this.output.findIndex((o) => o.isAnInternalHlsOutput());
    console.log(this.output);
    console.log(hlsOutput);
    if (!!~hlsOutput) {
      this.output[hlsOutput].hlsConfig = {
        uri: `${baseUrl}/hls/${this._id.toString()}/${streamId}`,
        method: HttpMethod.POST,
      };
    }
  }
  getInternalHlsOutput() {
    return this.output.find((o) => o.isAnInternalHlsOutput());
  }
}

export const PipelineSchema = SchemaFactory.createForClass(PipelineModel);

PipelineSchema.loadClass(PipelineModel);
