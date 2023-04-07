/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import {
  CarInterface,
  GarageInterface,
  UserInterface,
} from '@car-net/interfaces';
import { GaragesService } from '../garages.service';
import { AuthService } from '../../Auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'car-net-garages-card',
  templateUrl: './garages-card.component.html',
  styleUrls: ['./garages-card.component.css'],
})
export class GaragesCardComponent implements OnInit {
  numberOfLikes: number;
  numberOfCarsInGarage: number;

  @Input()
  garage: GarageInterface;
  firstCar: CarInterface | undefined;
  secondCar: CarInterface | undefined;
  thirdCar: CarInterface | undefined;

  user$: Observable<UserInterface> | undefined;
  like$: Observable<GarageInterface> | undefined;

  liked: string[];
  error: string;

  alreadyLiked: boolean;
  liky = false;

  constructor(
    private garagesService: GaragesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.numberOfLikes = this.garage.likes.length;
    this.numberOfCarsInGarage = this.garage.cars.length;
    this.firstCar = this.garage.cars[0];
    this.secondCar = this.garage.cars[1];
    this.thirdCar = this.garage.cars[2];

    this.liked = [];

    this.user$ = this.garagesService.findUserByEmail(
      localStorage.getItem('email')
    );
      if (localStorage.getItem('email') != null) {
    const a = this.user$?.subscribe((user) => { if(user.likedGarages.includes(this.garage.garageName)) {this.liky = true;} });
      }
  }

  likeGarage() {
    if(!localStorage.getItem('email')) {
      alert('You must be logged in to like a garage');
    }
    const garageName = this.garage.garageName;
    this.user$?.subscribe((user) => {
      for (const garagee of user.likedGarages) {
        this.liked.push(garagee.toString());
      }
    });
    const email = localStorage.getItem('email');

    if (this.liky) {
      this.garagesService.removeLike(garageName, email).subscribe();
      this.numberOfLikes--;
      this.liky = false;
    }
    else {
    const like$ = this.garagesService.likeGarage(garageName, email).subscribe(
      () => {},
      (err) => {
        const a = this.garagesService.removeLike(garageName, email).subscribe(); alert((err) + 'You cannot like your own garage'); if(err) this.numberOfLikes --;
      }
    );
    this.liky = true;
    this.numberOfLikes++;
    }
  }
}
