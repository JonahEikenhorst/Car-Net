import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brand.controller';
import { BrandSchema } from './brand.schema';
import { BrandService } from './brand.service';


@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: 'Brand', schema: BrandSchema
        }
    ])
],
    controllers: [BrandController],
    providers: [BrandService],
    exports: [BrandService]
})

export class BrandModule {

}