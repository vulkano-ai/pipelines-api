import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PipelineView, PipelineModel } from 'src/modules/pipelines/models/pipeline';

export type RtmpStreamDocument = RtmpStreamModel & Document;

export interface RedirectBody {
  app: string;
  flashver: string;
  swfurl: string;
  tcurl: string;
  pageurl: string;
  addr: string;
  clientid: string;
  call: string;
  name: string;
  type: string;
}

export type RtmpStreamView = {
  _id: string;
  app: string;
  status: string;
  name: string;
  addr: string;
  startTs: Date;
  endTs: Date;
  pipeline: PipelineView;
};
@Schema({ timestamps: true })
export class RtmpStreamModel {

  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  app: string;

  @Prop({ type: String, required: true })
  status: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  addr: string;

  @Prop({ type: Date })
  startTs: Date;

  @Prop({ type: Date })
  endTs: Date;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Pipeline' })
  pipeline: PipelineModel;

  view(): RtmpStreamView {
    return {
      _id: this._id.toString(),
      app: this.app,
      status: this.status,
      name: this.name,
      addr: this.addr,
      startTs: this.startTs,
      endTs: this.endTs,
      pipeline: this.pipeline.view(),
    };
  }
}

const _RtmpStreamSchema = SchemaFactory.createForClass(RtmpStreamModel);

export const RtmpStreamSchema = _RtmpStreamSchema;
