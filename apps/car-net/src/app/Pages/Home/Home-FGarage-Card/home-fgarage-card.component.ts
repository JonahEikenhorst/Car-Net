/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input, OnInit } from "@angular/core";
import { CarInterface, GarageInterface, UserInterface } from "@car-net/interfaces";
import { HomeService } from "../home.service";
import { Observable } from "rxjs";

@Component({
  selector: "car-net-homefgarage-card",
  templateUrl: "./home-fgarage-card.component.html",
  styleUrls: ["./home-fgarage-card.component.css"]
})
export class HomeFGarageCardComponent implements OnInit {
  numberOfLikes: number;
  numberOfCarsInGarage: number;

  
  @Input()
  garage: GarageInterface;
  firstCar: CarInterface | undefined;
  secondCar: CarInterface | undefined;
  thirdCar: CarInterface | undefined;
  garageIdd: string;
  user$: Observable<UserInterface> | undefined;
  like$: Observable<GarageInterface> | undefined;

  liked: string[];
  error: string;
  liky = false;
  alreadyLiked: boolean;
  loggedIn = false;

  constructor(private homeService: HomeService) {}


  ngOnInit() {
    this.numberOfLikes = this.garage.likes.length;
    this.numberOfCarsInGarage = this.garage.cars.length;
    if(this.garage.cars.length >= 1) {
      this.firstCar = this.garage.cars[0];
    }
    if(this.garage.cars.length >= 2) {
      this.secondCar = this.garage.cars[1];
    }
    if (this.garage.cars.length >= 3) {
      this.thirdCar = this.garage.cars[2];
    }
    this.liked = [];

    if(localStorage.getItem('email') != null) {
      this.loggedIn = true;
    }

    this.user$ = this.homeService.findUserByEmail(localStorage.getItem("email"));
    if(localStorage.getItem('email') != null) {
    const a = this.user$?.subscribe((user) => { if(user.likedGarages.includes(this.garage.garageName)) {this.liky = true;} });
    }
  }

  likeGarage() {
    const garageName = this.garage.garageName;
    this.user$?.subscribe((user) => {
      for (const garagee of user.likedGarages) {
        this.liked.push(garagee.toString());
      }
    });
    const email = localStorage.getItem('email');

    if (this.liky) {
      this.homeService.removeLike(garageName, email).subscribe();
      this.numberOfLikes--;
      this.liky = false;
    }
    else {
    const like$ = this.homeService.likeGarage(garageName, email).subscribe(
      () => {},
      (err) => {
        const a = this.homeService.removeLike(garageName, email).subscribe(); alert((err.error.message) + ': Login to like a garage or dont like your own garage'); if(err) this.numberOfLikes --;
      }
    );
    this.liky = true;
    this.numberOfLikes++;
    }
  }

}