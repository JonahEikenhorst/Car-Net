import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from '../car/car.module';
import { GarageController } from './garage.controller';
import { GarageSchema } from './garage.schema';
import { GarageService } from './garage.service';


@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'Garage', schema: GarageSchema
        }
    ]),
    CarModule
],
    controllers: [GarageController],
    providers: [GarageService],
    exports: [GarageService]
})

export class GarageModule {

}