import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../Auth/auth.service';
import { BrandService } from './brand.service';
import { BrandCardComponent } from './Brand-Card/brand-card.component';
import { BrandComponent } from './Brand-Page/brand.component';
import { BrandEditComponent } from './Brand-Edit/brand-edit.component';
import { BrandDetailComponent } from './Brand-Detail/brand-detail.component';
import { BrandErrorComponent } from './Brand-Error/brand-error.component';

@NgModule({
  declarations: [
    BrandCardComponent,
    BrandComponent,
    BrandEditComponent,
    BrandDetailComponent,
    BrandErrorComponent
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
    BrandEditComponent,
    BrandCardComponent,
    BrandErrorComponent
  ],
  providers: [
    BrandService,
    AuthService
  ]
})
export class BrandModule {}