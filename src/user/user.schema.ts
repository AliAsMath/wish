import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Country } from 'src/country/country.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  education: string;

  @Prop({ required: true })
  experience: number;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Country', required: true })
  country: Country | string;

  @Prop({ required: true })
  position: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
