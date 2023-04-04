import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from '../car/car.module';
import { CarModelModule } from '../carModel/carModel.module';
import { UserModule } from '../user/user.module';
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
    CarModule, CarModelModule, UserModule
],
    controllers: [GarageController],
    providers: [GarageService],
    exports: [GarageService]
})

export class GarageModule {

}