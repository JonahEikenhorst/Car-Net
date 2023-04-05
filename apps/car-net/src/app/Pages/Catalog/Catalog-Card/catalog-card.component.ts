import { Component, Input, OnInit } from "@angular/core";
import { CarInterface } from "@car-net/interfaces";

@Component({
  selector: "car-net-catalogcar-card",
  templateUrl: "./catalog-card.component.html",
  styleUrls: ["./catalog-card.component.css"]
})
export class CatalogCardComponent implements OnInit {
  @Input()
  car: CarInterface;

  ngOnInit() {
  }
}