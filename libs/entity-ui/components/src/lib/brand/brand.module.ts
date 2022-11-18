import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BrandListComponent },
  { path: 'new', pathMatch: 'full', component: BrandEditComponent },
  { path: ':id', pathMatch: 'full', component: BrandDetailComponent },
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
    ],
     exports: [BrandListComponent],
  })
  export class BrandModule {}