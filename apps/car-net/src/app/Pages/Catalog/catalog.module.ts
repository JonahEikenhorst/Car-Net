import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CatalogService } from './catalog.service';
import { CatalogCardComponent } from './Catalog-Card/catalog-card.component';
import { CatalogComponent } from './Catalog-Page/catalog.component';
import { CatalogDetailComponent } from './Catalog-Detail/catalog-detail.component';
import { CarEditComponent } from './Catalog-Edit/catalog-edit.component';


@NgModule({
  declarations: [
    CatalogCardComponent,
    CatalogComponent,
    CatalogDetailComponent,
    CarEditComponent
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
  exports: [ CatalogCardComponent, CatalogComponent, CatalogDetailComponent, CarEditComponent
  ],
  providers: [ CatalogService
  ]
})
export class CatalogModule {}