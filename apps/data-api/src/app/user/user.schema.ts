import { Document, Schema as MongooseSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail, isString } from "class-validator";
import { Car } from "../car/car.schema";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, validate: isString })
  username: string;

  @Prop({ required: true, validate: isEmail })
  email: string;

  @Prop({ required: true, default: false })
  admin: boolean;

  @Prop({ required: true, type: [MongooseSchema.Types.ObjectId], ref: "Car" })
  cars: Car[];

  @Prop({ required: true })
  followers: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.add({
  followers: {
    type: [UserSchema]
  }
});