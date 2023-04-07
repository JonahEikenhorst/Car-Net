/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarInterface, UserInterface } from '@car-net/interfaces';
import { CatalogService } from '../catalog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'car-net-catalogcar-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.css'],
})
export class CatalogDetailComponent implements OnInit {
  @Input()
  car: CarInterface;
  numberPlate: string | null;
  user$: Observable<UserInterface>;
  garageName: string | null;
  owned = false;

  constructor(
    private router: Router,
    private catalogService: CatalogService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.numberPlate = this.route.snapshot.paramMap.get('numberPlate');
    const car$ = this.catalogService.findCarByNumberPlate(
      this.numberPlate ? this.numberPlate : ''
    );
    const email = localStorage.getItem('email')!;
    this.user$ = this.catalogService.findUserByEmail(email);

    this.user$.subscribe((user) => {
      this.catalogService
      .findGarageByName(user.garageName)
      .subscribe((garage) => {
        for (const car of garage.cars) {
          if (car.numberPlate == this.numberPlate) {
            this.owned = true;
          }
        }
      });
    });

    
    car$.subscribe((car) => {
      this.car = car;
    });
  }

  navigateToCar(numberPlate: string) {
    this.router.navigateByUrl(`/catalog/${numberPlate}`);
  }

  addCar() {
    console.log(this.car.numberPlate);
    const boughtCar = this.catalogService
      .addCarToGarage(localStorage.getItem('email'), this.car.numberPlate)
      .subscribe();
    this.router.navigateByUrl('/home');
  }

  removeCar() {
    console.log(this.car.numberPlate);
    const boughtCar = this.catalogService
      .removeCarFromGarage(localStorage.getItem('email'), this.car.numberPlate)
      .subscribe();
    this.router.navigateByUrl('/home');
  }
}
