import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModelController } from './carModel.controller';
import { CarModelSchema } from './carModel.schema';
import { CarModelService } from './carModel.service';


@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'CarModel', schema: CarModelSchema
        }
    ])
],
    controllers: [CarModelController],
    providers: [CarModelService],
    exports: [CarModelService]
})

export class CarModelModule {

}