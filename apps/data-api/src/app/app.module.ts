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
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { Neo4jModule } from 'nest-neo4j';


@Module({
  imports: [
    Neo4jModule.forRoot({
      scheme: 'neo4j+s',
      host: '0d73e428.databases.neo4j.io',
      port: 7687,
      username: 'neo4j',
      password: '9KrdFigVn-h-E_wy7YFsF37aHWJPvb1BuXG-ueG5J54'
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION), 
    CarModule,
    BrandModule,
    CarModelModule,
    GarageModule,
    AuthModule,
    UserModule
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
        GarageController,
        UserController

      )
  }
}
