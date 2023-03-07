import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const routes: Routes = [
   { path: 'brands', pathMatch: 'full', component: BrandListComponent },
   { path: 'brands/new', pathMatch: 'full', component: BrandEditComponent },
   { path: 'brands/:id', pathMatch: 'full', component: BrandDetailComponent },
   { path: ':id/edit', pathMatch: 'full', component: BrandEditComponent },


];

@NgModule({
    declarations: [
        BrandEditComponent,
        BrandListComponent,
        BrandDetailComponent
    ],
    imports: [
      CommonModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      BsDatepickerModule.forRoot(),
    ],
     exports: [BrandListComponent, BrandEditComponent, BrandDetailComponent],
  })
  export class BrandModule {}