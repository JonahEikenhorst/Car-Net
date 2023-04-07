import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CarInterface } from "@car-net/interfaces";

@Component({
  selector: "car-net-garagecar-card",
  templateUrl: "./garage-card.component.html",
  styleUrls: ["./garage-card.component.css"]
})
export class GarageCardComponent implements OnInit {
  @Input()
  car: CarInterface;
  constructor(private router: Router) {}
  ngOnInit() {
  }

  navigateToCar(numberPlate: string) {
    this.router.navigateByUrl(`/catalog/${numberPlate}`);
  }
}