/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandInterface, UserInterface } from '@car-net/interfaces';
import { Observable } from 'rxjs';
import { BrandService } from '../brand.service';

@Component({
  selector: 'car-net-catalogcar-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css'],
})
export class BrandDetailComponent implements OnInit {
  @Input()
  brand: BrandInterface;
  numberPlate: string | null;
  user$: Observable<UserInterface>;
  garageName: string | null;
  owned = false;
  email = localStorage.getItem('email')!;
  brandName: string | null;

  newEstablished: string;

  succes = false;
  removeSuccess = false;
  constructor(
    private router: Router,
    private brandService: BrandService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.numberPlate = this.route.snapshot.paramMap.get('numberPlate');
    this.brandName = this.route.snapshot.paramMap.get('brandName');
    const brand$ = this.brandService.findBrandbyName(this.brandName? this.brandName : '');
    const car$ = this.brandService.findCarByNumberPlate(
      this.numberPlate ? this.numberPlate : ''
    );

    this.user$ = this.brandService.findUserByEmail(this.email);

    this.user$.subscribe((user) => { if(user.garageName != null) {
      this.brandService
        .findGarageByName(user.garageName)
        .subscribe((garage) => {
          for (const car of garage.cars) {
            if (car.numberPlate == this.numberPlate) {
              this.owned = true;
            }
          }
        });
      }
    });

    brand$.subscribe((brand) => {
      this.brand = brand; this.newEstablished = this.brand.established.split("-").reverse().join("-");
    });
  }

  removeBrand() {
    this.brandService.removeBrand(this.brandName? this.brandName : '').subscribe(() => {
      this.removeSuccess = true;
        setTimeout(() => {
            this.router.navigate(['/brand']);
            }, 2000);
    });
  }

  editBrand() {
    this.router.navigateByUrl('/brand/edit/' + this.brandName);
  }

}
