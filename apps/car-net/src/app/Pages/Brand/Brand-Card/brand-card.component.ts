import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BrandInterface } from "@car-net/interfaces";

@Component({
  selector: "car-net-brand-card",
  templateUrl: "./brand-card.component.html",
  styleUrls: ["./brand-card.component.css"]
})
export class BrandCardComponent implements OnInit {
  @Input()
  brand: BrandInterface;
  

  constructor(private router: Router) { }
  ngOnInit() {
    this.brand.established = this.brand.established.split("-").reverse().join("-");
  }

  navigateToBrand(brandName: string) {
    this.router.navigateByUrl(`/brand/${brandName}`);
  }


}