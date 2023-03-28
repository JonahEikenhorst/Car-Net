import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarageComponent } from './Garage-Page/garage.component';
import { GarageCardComponent } from './garage-card/garage-card.component';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    GarageComponent,
    GarageCardComponent,
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
    GarageCardComponent
  ]
})
export class GarageModule {}