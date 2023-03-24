
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Brand } from '../brand/brand.schema';
import { CarModel } from '../carModel/carModel.schema';

export type CarDocument = Car & HydratedDocument<Car>;

@Schema()
export class Car {
    @Prop({type: String, required: true})
    numberPlate: string;

    @Prop({type: String, required: true})
    country: string;

    @Prop({type: Brand, required: false})
    brand: Brand;

    @Prop({type: CarModel, required: false})
    carModel: CarModel;
}

export const CarSchema = SchemaFactory.createForClass(Car);