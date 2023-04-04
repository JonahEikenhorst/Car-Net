import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GaragesComponent } from './Garages-Page/garages.component';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../Auth/auth.service';
import { GaragesService } from './garages.service';
import { GaragesCardComponent } from './Garages-Card/garages-card.component';

@NgModule({
  declarations: [
    GaragesComponent,
    GaragesCardComponent
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
    ReactiveFormsModule,
    RouterLink
  ],
  exports: [
    GaragesCardComponent,
  ],
  providers: [
    GaragesService,
    AuthService
  ]
})
export class GaragesModule {}