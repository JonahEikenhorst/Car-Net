import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isString } from "class-validator";
import { User } from "../user/user.schema";
// import { Car } from "../car/car.schema";


export type GarageDocument = Garage & Document;

@Schema()
export class Garage {
  @Prop({ required: true, validate: isString })
  garageName: string;

  @Prop({ required: true })
  owner: User;

  @Prop({ required: false })
  likes: User[];


// REFERENCE   
//   @Prop({ required: false, type: [MongooseSchema.Types.ObjectId], ref: "Car" })
//   cars: Car[];

}

export const GarageSchema = SchemaFactory.createForClass(Garage);
