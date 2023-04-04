import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail, isString } from "class-validator";
import { Garage } from "../garage/garage.schema";


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, validate: isString })
  username: string;

  @Prop({ required: true, validate: isEmail })
  email: string;

  @Prop({ required: false, default:[] })
  roles: string[];

  @Prop({ required: false})
  garageName: string;

  @Prop({ required: false})
  likedGarages: Garage[];

}

export const UserSchema = SchemaFactory.createForClass(User);
