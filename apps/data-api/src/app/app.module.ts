import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from './car/car.module';
import { BrandModule } from './brand/brand.module';
import { CarModelModule } from './carModel/carModel.module';
import { GarageModule } from './garage/garage.module';
import { AuthModule } from './auth/auth.module';
import { CarController } from './car/car.controller';
import { BrandController } from './brand/brand.controller';
import { CarModelController } from './carModel/carModel.controller';
import { GarageController } from './garage/garage.controller';
import { TokenMiddleware } from './auth/token.middleware';



@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION), 
    CarModule,
    BrandModule,
    CarModelModule,
    GarageModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void { 
    consumer 
      .apply(TokenMiddleware)
      .forRoutes(
        CarController,
        BrandController,
        CarModelController,
        GarageController

      )
  }
}
