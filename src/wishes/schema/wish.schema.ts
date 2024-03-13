import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

export type WishDocument = Wish & Document;

@Schema()
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
}

export const WishSchema =
  SchemaFactory.createForClass(Wish).plugin(mongoosePaginate);
