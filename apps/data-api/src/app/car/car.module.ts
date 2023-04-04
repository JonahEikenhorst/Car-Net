import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandModule } from '../brand/brand.module';
import { CarModelModule } from '../carModel/carModel.module';
import { CarController } from './car.controller';
import { CarSchema } from './car.schema';
import { CarService } from './car.service';



@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'Car', schema: CarSchema
        }
    ]),
    BrandModule, CarModelModule
],
    controllers: [CarController],
    providers: [CarService],
    exports: [CarService]
})

export class CarModule {

}