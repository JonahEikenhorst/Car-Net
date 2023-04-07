import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarageComponent } from './Garage-Page/garage.component';
import { GarageCardComponent } from './Garage-Card/garage-card.component';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../Auth/auth.service';
import { GarageService } from './garage.service';
import { GarageCreateComponent } from './Garage-Create/garage-create.component';

@NgModule({
  declarations: [
    GarageComponent,
    GarageCardComponent,
    GarageCreateComponent
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
    GarageCreateComponent,
    GarageCardComponent
  ],
  providers: [
    GarageService,
    AuthService
  ]
})
export class GarageModule {}