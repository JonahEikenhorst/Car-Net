import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isNumber, isString } from "class-validator";

export type BrandDocument = Brand & Document;

@Schema()
export class Brand {
  @Prop({ required: true, validate: isNumber })
  id: number;

  @Prop({ required: true, validate: isString })
  name: string;

  @Prop({ required: true, validate: isString })
  established: string;

  @Prop({ required: true, validate: isString })
  countryOfOrigin: string;

  @Prop({ required: true, validate: isString })
  logoUrl: string;

}

export const BrandSchema = SchemaFactory.createForClass(Brand);