import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from './car/car.module';
import { BrandModule } from './brand/brand.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION), 
    CarModule,
    BrandModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
