import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isString } from "class-validator";
import { Brand } from "../brand/brand.schema";
import { CarType } from "@car-net/interfaces";

export type ModelDocument = Model & Document;

@Schema()
export class Model {
  @Prop({ required: true, validate: isString })
  id: number;

  @Prop({ required: true, validate: isString })
  name: string;

  @Prop({ required: true, validate: isString })
  carType: CarType;

  @Prop({ required: true, validate: isString })
  brand: string;   // BRAND IS A SCHEMA, NOT A STRING

  @Prop({ required: true, validate: isString })
  imageUrl: string;

}

export const ModelSchema = SchemaFactory.createForClass(Model);


