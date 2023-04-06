import { Component, Input, OnInit } from "@angular/core";
import { CarInterface, GarageInterface } from "@car-net/interfaces";
import { HomeService } from "../home.service";

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


  }

  likeGarage() {
    const email = localStorage.getItem("email");
    const garageName = this.garage.garageName; 
    this.homeService.likeGarage(garageName, email);


  }

}