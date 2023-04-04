import { Component, Input, OnInit } from "@angular/core";
import { CarInterface } from "@car-net/interfaces";

@Component({
  selector: "car-net-garagecar-card",
  templateUrl: "./garage-card.component.html",
  styleUrls: ["./garage-card.component.css"]
})
export class GarageCardComponent implements OnInit {
  @Input()
  car: CarInterface;

  ngOnInit() {
  }
}