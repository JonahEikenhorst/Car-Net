import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelEditComponent } from './model-edit/model-edit.component';
import { ModelDetailComponent } from './model-detail/model-detail.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const routes: Routes = [
   { path: 'models', pathMatch: 'full', component: ModelListComponent },
   { path: 'models/new', pathMatch: 'full', component: ModelEditComponent },
   { path: 'models/:id', pathMatch: 'full', component: ModelDetailComponent },
   { path: ':id/edit', pathMatch: 'full', component: ModelEditComponent },


];

@NgModule({
    declarations: [
        ModelEditComponent,
        ModelListComponent,
        ModelDetailComponent
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
     exports: [ModelListComponent],
  })
  export class ModelModule {}