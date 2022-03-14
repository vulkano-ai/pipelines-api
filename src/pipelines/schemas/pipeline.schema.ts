import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { availableProtocols } from '../../app.config';
import * as mongoose from 'mongoose';

export type PipelineDocument = PipelineModel & Document;

@Schema()
export class PipelineModel {
  @Prop({ type: String, enum: availableProtocols, required: true })
  inputProtocol: string;

  @Prop({ type: String, required: true })
  streamKey: string;

  @Prop({ type: String, required: true })
  privateStreamKey: string;

  @Prop({ type: String, enum: availableProtocols, required: true })
  outputProtocol: string;

  @Prop({
    type: [
      raw({
        name: String,
        config: mongoose.Schema.Types.Mixed,
      }),
    ],
  })
  filters: string;
}

export const PipelineSchema = SchemaFactory.createForClass(PipelineModel);
