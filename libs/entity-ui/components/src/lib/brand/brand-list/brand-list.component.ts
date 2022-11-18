import { Component, OnInit } from '@angular/core';
import { brand } from 'apps/data-api/src/app/brand/brand.model';
import { Observable } from 'rxjs';
import { BrandService } from 'apps/data-api/src/app/brand/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {
  brands: brand[] | undefined;
  brands$: Observable<brand[]> | undefined;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brands$ = this.brandService.getList();
  }
}