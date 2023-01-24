import { Module } from '@nestjs/common';
import { BrandModule } from '@car-net/entity-ui/components';
import { ModelModule } from '@car-net/entity-ui/components';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [BrandModule, ModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
