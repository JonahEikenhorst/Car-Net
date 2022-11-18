import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { brand } from 'apps/data-api/src/app/brand/brand.model';
import { Observable, Subscription } from 'rxjs';
import { BrandService } from 'apps/data-api/src/app/brand/brand.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css'],
})
export class BrandDetailComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  brandId: number | undefined;
  brand$: Observable<brand> | undefined;
  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.brandId = Number(params.get('id'));
      console.log(`This is the movie ID ${this.brandId}`);
      this.brand$ = this.brandService.getById(this.brandId);
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}