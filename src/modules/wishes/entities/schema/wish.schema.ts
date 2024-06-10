import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type WishDocument = Wish & Document;

@Schema({ timestamps: true })
export class Wish {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({
    type: [String],
    required: false,
  })
  urlLinks: string[];

  @Prop({ required: true })
  price: number;

  @Prop({
    type: [String],
    required: true,
  })
  categories: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ type: String, required: false, select: false })
  owner: string;
}

export const WishSchema =
  SchemaFactory.createForClass(Wish).plugin(mongoosePaginate);
