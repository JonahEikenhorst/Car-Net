import { Component, Input, OnInit } from "@angular/core";
import { CarInterface } from "@car-net/interfaces";
import { AuthService } from "../../Auth/auth.service";
import { HomeService } from "../home.service";

@Component({
  selector: "car-net-homefcar-card",
  templateUrl: "./home-fcar-card.component.html",
  styleUrls: ["./home-fcar-card.component.css"]
})
export class HomeFCarCardComponent implements OnInit {

  @Input()
  car: CarInterface;

  constructor(private homeService: HomeService, private authService: AuthService) {}


  ngOnInit() {

  }

}