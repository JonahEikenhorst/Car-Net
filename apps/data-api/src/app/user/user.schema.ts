import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isEmail, isString } from "class-validator";


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, validate: isString })
  username: string;

  @Prop({ required: true, validate: isEmail })
  email: string;

  @Prop({ required: false })
  roles: Array<string>;


// REFERENCE   
//   @Prop({ required: false, type: [MongooseSchema.Types.ObjectId], ref: "Car" })
//   cars: Car[];

}

export const UserSchema = SchemaFactory.createForClass(User);
