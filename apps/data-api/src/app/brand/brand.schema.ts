import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isString } from "class-validator";
import { CarModel } from "../carModel/carModel.schema";

export type BrandDocument = Brand & HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({ required: true, validate: isString })
  name: string;

  @Prop({ required: true, validate: isString })
  established: string;

  @Prop({ required: true, validate: isString })
  countryOfOrigin: string;

  @Prop({ required: true, validate: isString })
  logoUrl: string;

  @Prop({ required: false })
  carModels: CarModel[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);