import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

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
@Schema({ timestamps: true })
export class RtmpStreamModel {
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pipeline' })
  pipeline: mongoose.Types.ObjectId;
}

const _RtmpStreamSchema = SchemaFactory.createForClass(RtmpStreamModel);

export const RtmpStreamSchema = _RtmpStreamSchema;
