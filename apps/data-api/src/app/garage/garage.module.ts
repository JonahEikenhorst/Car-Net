import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GarageController } from './garage.controller';
import { GarageSchema } from './garage.schema';
import { GarageService } from './garage.service';


@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'Garage', schema: GarageSchema
        }
    ])
],
    controllers: [GarageController],
    providers: [GarageService],
    exports: [GarageService]
})

export class GarageModule {

}