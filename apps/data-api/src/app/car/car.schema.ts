// import { Brand } from '@car-net/entity-ui/components';
// import { Model } from '@car-net/entity-ui/components';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = Car & HydratedDocument<Car>;

@Schema()
export class Car {
    @Prop({type: String, required: true})
    numberPlate: string;

    @Prop({type: String, required: true})
    country: string;

    // @Prop()
    // brand: Brand;

    // @Prop()
    // model: Model;
}

export const CarSchema = SchemaFactory.createForClass(Car);