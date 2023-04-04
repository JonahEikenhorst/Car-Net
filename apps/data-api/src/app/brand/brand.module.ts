import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModelModule } from '../carModel/carModel.module';
import { BrandController } from './brand.controller';
import { BrandSchema } from './brand.schema';
import { BrandService } from './brand.service';


@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'Brand', schema: BrandSchema
        }
    ]),
    CarModelModule,
],
    controllers: [BrandController],
    providers: [BrandService],
    exports: [BrandService]
})

export class BrandModule {

}