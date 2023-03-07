import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandService } from 'apps/data-api/src/app/brand/brand.service';
import { Brand } from 'apps/data-api/src/app/brand/brand.schema'

@Component({
  selector: 'car-net-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {
  brands: Brand[] | undefined;
  brands$: Observable<Brand[]> | undefined;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brands$ = this.brandService.getList();
  }
}