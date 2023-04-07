/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import {
  CarInterface,
  GarageInterface,
  UserInterface,
} from '@car-net/interfaces';
import { Observable } from 'rxjs';
import { HomeService } from '../home.service';

@Component({
  selector: 'car-net-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cars$: Observable<CarInterface[]> | undefined;
  garages$: Observable<GarageInterface[]> | undefined;
  user$: Observable<UserInterface> | undefined;

  likedGarages: GarageInterface[] | undefined = [];

  recommendedGarages: GarageInterface[] | undefined = [];
  email: string | null;

  loggedIn = false;
  constructor(private homeService: HomeService) {}

  ngOnInit() {

    this.cars$ = this.homeService.findAllCars();
    this.garages$ = this.homeService.findAll();
    this.email = localStorage.getItem('email');
    this.user$ = this.homeService.findUserByEmail(this.email);
    if (localStorage.getItem('email') != null) {

    if (localStorage.getItem('email') != null) {
      this.loggedIn = true;
    }

    this.user$.subscribe((user) => { 
      if (!user) {
        "not logged in";
      }
      else if (user.likedGarages != null) {
        for(const garage of user.likedGarages) {
          this.homeService.findGarageByName(garage).subscribe((x) => {
            this.likedGarages?.push(x);
          });
        }}});
      
    const a = this.homeService.findRecommendedGarages(this.email).subscribe((garages) => {
      this.recommendedGarages = garages;
    });
}
  }
}
