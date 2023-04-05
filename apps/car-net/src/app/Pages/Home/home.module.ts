import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Home-Page/home.component';
import { HomeService } from './home.service';
import { HomeFCarCardComponent } from './Home-FCar-Card/home-fcar-card.component';
import { HomeFGarageCardComponent } from './Home-FGarage-Card/home-fgarage-card.component';




@NgModule({
    declarations: [
        HomeComponent,
        HomeFCarCardComponent,
        HomeFGarageCardComponent
    ],
    imports: [
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
      RouterModule,
    ],
     exports: [HomeComponent, HomeFCarCardComponent, HomeFGarageCardComponent],
     providers: [Location, HomeService],
  })
  export class HomeModule {}