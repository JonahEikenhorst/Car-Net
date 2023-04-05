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


@NgModule({
  declarations: [
    CatalogCardComponent,
    CatalogComponent
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
  exports: [ CatalogCardComponent, CatalogComponent
  ],
  providers: [ CatalogService
  ]
})
export class CatalogModule {}