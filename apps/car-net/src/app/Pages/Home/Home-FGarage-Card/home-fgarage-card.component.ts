import { Component, Input, OnInit } from "@angular/core";
import { CarInterface, GarageInterface } from "@car-net/interfaces";
import { AuthService } from "../../Auth/auth.service";
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
  firstCar: CarInterface;
  secondCar: CarInterface;
  thirdCar: CarInterface;
  garageIdd: string;

  constructor(private homeService: HomeService) {}


  ngOnInit() {
    this.numberOfLikes = this.garage.likes.length;
    this.numberOfCarsInGarage = this.garage.cars.length;
    this.firstCar = this.garage.cars[0];
    this.secondCar = this.garage.cars[1];
    this.thirdCar = this.garage.cars[2];


  }

  likeGarage() {
    const email = localStorage.getItem("email");
    const garageName = this.garage.garageName; 
    this.homeService.likeGarage(garageName, email);


  }

}