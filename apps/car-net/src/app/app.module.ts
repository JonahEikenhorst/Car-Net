import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { ModelModule } from '@car-net/entity-ui/components';
import { HttpClientModule } from '@angular/common/http';
import { BrandModule } from '@car-net/entity-ui/components';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AboutComponent } from './Pages/About/about.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, AboutComponent],
  imports: [
    BrowserModule,
    BrandModule,
    ModelModule,
    TooltipModule.forRoot(),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
