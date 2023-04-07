import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CarInterface } from "@car-net/interfaces";

@Component({
  selector: "car-net-catalogcar-card",
  templateUrl: "./catalog-card.component.html",
  styleUrls: ["./catalog-card.component.css"]
})
export class CatalogCardComponent implements OnInit {
  @Input()
  car: CarInterface;

  constructor(private router: Router) { }
  ngOnInit() {
  }

  navigateToCar(numberPlate: string) {
    this.router.navigateByUrl(`/catalog/${numberPlate}`);
  }


}