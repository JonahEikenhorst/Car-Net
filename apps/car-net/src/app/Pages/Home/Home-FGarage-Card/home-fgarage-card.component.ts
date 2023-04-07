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

  alreadyLiked: boolean;

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

    this.user$ = this.homeService.findUserByEmail(localStorage.getItem("email"));

  }

  likeGarage() {
    const garageName = this.garage.garageName; 
    this.user$?.subscribe((user) => { for(const garagee of user.likedGarages) {
      this.liked.push(garagee.toString());
    }});
    
    if(this.liked.includes(garageName)) {
      console.log("You already liked this garage!");
      this.alreadyLiked = true;
    } else {
      const email = localStorage.getItem("email");
      const like$ = this.homeService.likeGarage(garageName, email).subscribe(()=>{}, (err) => { alert("Error: " + err.error.message + ""); if(!err) {
        this.numberOfLikes++;
      }});
    }

  }

}