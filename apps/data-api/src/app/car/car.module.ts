import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car.controller';
import { CarSchema } from './car.schema';
import { CarService } from './car.service';


@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'Car', schema: CarSchema
        }
    ])
],
    controllers: [CarController],
    providers: [CarService],
    exports: [CarService]
})

export class CarModule {

}