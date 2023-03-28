import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type HlsDocument = HlsModel & Document;

@Schema()
export class HlsModel {
  @Prop({ required: false })
  path: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pipeline' })
  pipeline: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'RtmpStream' })
  rtmpStream: mongoose.Types.ObjectId;
}

const _HlsSchema = SchemaFactory.createForClass(HlsModel);

export const HlsSchema = _HlsSchema;
