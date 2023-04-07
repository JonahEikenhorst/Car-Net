/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { CarInterface } from '@car-net/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'car-net-garage',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit{
  cars$: Observable<CarInterface[]> | undefined;

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.cars$ = this.catalogService.getCars();
  }
}
