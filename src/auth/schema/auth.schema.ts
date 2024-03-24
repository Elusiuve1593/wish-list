import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
