import { Component, Input, OnInit } from "@angular/core";
import { CarInterface, GarageInterface } from "@car-net/interfaces";

@Component({
  selector: "car-net-garages-card",
  templateUrl: "./garages-card.component.html",
  styleUrls: ["./garages-card.component.css"]
})
export class GaragesCardComponent implements OnInit {
  numberOfLikes: number;
  numberOfCarsInGarage: number;
  @Input()
  garage: GarageInterface;
  firstCar: CarInterface;
  secondCar: CarInterface;
  thirdCar: CarInterface;

  ngOnInit() {
    this.numberOfLikes = this.garage.likes.length;
    this.numberOfCarsInGarage = this.garage.cars.length;
    this.firstCar = this.garage.cars[0];
    this.secondCar = this.garage.cars[1];
    this.thirdCar = this.garage.cars[2];
  }
}