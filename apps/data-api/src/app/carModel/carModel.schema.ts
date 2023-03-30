import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isString } from "class-validator";

export type CarModelDocument = CarModel & Document;

export enum CarType {
  SUV = 'SUV',
  Sedan = 'Sedan',
  Hatchback = 'Hatchback',
  Coupe = 'Coupe',
  Convertible = 'Convertible',
  Station = 'Station',
  Van = 'Van',
  Truck = 'Truck',
  Minivan = 'Minivan',
  Pickup = 'Pickup',
  Hybrid = 'Hybrid',
  Electric = 'Electric',
  Other = 'Other'

}

@Schema()
export class CarModel {
  @Prop({ required: true, validate: isString })
  name: string;

  @Prop({ required: true, validate: isString })
  carType: CarType;

  @Prop({ required: false, validate: isString })
  imageUrl: string;

  @Prop({ required: false})
  brand: string; // Index into Brand collection

}

export const CarModelSchema = SchemaFactory.createForClass(CarModel);


