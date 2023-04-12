
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { BrandModule } from  './Pages/Brand/brand.module'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AboutComponent } from './Pages/About/about.component';
import { AuthService } from './Pages/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './Pages/Auth/auth.module';
import { Location } from '@angular/common';
import { GarageModule } from './Pages/Garage/garage.module';
import { GarageService } from './Pages/Garage/garage.service';
import { HomeModule } from './Pages/Home/home.module';
import { GaragesModule } from './Pages/Garages/garages.module';
import { GaragesService } from './Pages/Garages/garages.service';
import { HomeService } from './Pages/Home/home.service';
import { CatalogService } from './Pages/Catalog/catalog.service';
import { CatalogModule } from './Pages/Catalog/catalog.module';
import { BrandService } from './Pages/Brand/brand.service';



@NgModule({
  declarations: [AppComponent, NavBarComponent, AboutComponent],
  imports: [
    BrowserModule,
    GaragesModule,
    CatalogModule,
    HomeModule,
    BrandModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    GarageModule,
    TooltipModule.forRoot(),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [AuthService, GarageService, GaragesService, Location, HomeService, CatalogService, BrandService],
  bootstrap: [AppComponent],
})
export class AppModule {}
