/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { BrandInterface, CarInterface } from '@car-net/interfaces';
import { Observable } from 'rxjs';
import { BrandService } from '../brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'car-net-garage',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands$: Observable<BrandInterface[]> | undefined;
  email: string | null;
  admin: boolean;

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit() {
    this.brands$ = this.brandService.getBrands();
    this.email = localStorage.getItem('email');
    if(this.email != null){
    const user = this.brandService
      .findUserByEmail(this.email ? this.email : '')
      .subscribe((user) => {
        if (user.roles.includes('Admin')) {
          this.admin = true;
        } else {
          this.admin = false;
        }
      });
    }
      setTimeout(() => {
    if (this.admin == false || this.email == null) {
      this.router.navigateByUrl('/brand/error');
    }
}, 50);
  }
}
