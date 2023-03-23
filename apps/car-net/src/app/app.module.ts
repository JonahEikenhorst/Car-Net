
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
// import { ModelModule } from './Components/model/model.module';
 import { BrandModule } from './Components/brand/brand.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AboutComponent } from './Pages/About/about.component';
import { AuthService } from './Pages/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './Pages/Auth/auth.module';
import { Location } from '@angular/common';


@NgModule({
  declarations: [AppComponent, NavBarComponent, AboutComponent],
  imports: [
    BrowserModule,
    BrandModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    // ModelModule,
    TooltipModule.forRoot(),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [AuthService, Location],
  bootstrap: [AppComponent],
})
export class AppModule {}
