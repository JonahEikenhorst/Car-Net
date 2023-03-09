import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandService } from '../brand.service';
import { BrandInterface } from '@car-net/interfaces';

@Component({
  selector: 'car-net-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent {
  brands$: Observable<BrandInterface[]> = new Observable<BrandInterface[]>(observer => {
    this.brandService.findAll().subscribe(brands => observer.next(brands));
  });

  constructor(private brandService: BrandService) {
  }
}

