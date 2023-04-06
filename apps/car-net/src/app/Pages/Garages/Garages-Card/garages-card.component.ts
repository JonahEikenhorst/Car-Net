import { Component, Input, OnInit } from "@angular/core";
import { CarInterface, GarageInterface, UserInterface } from "@car-net/interfaces";
import { GaragesService } from "../garages.service";
import { AuthService } from "../../Auth/auth.service";
import { Observable } from "rxjs";

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
  firstCar: CarInterface | undefined;
  secondCar: CarInterface | undefined;
  thirdCar: CarInterface | undefined;

  user$: Observable<UserInterface> | undefined;
  like$: Observable<GarageInterface> | undefined;

  liked: string[];
  error: string;

  alreadyLiked: boolean;

  constructor(private garagesService: GaragesService, private authService: AuthService) {}


  ngOnInit() {
    this.numberOfLikes = this.garage.likes.length;
    this.numberOfCarsInGarage = this.garage.cars.length;
    this.firstCar = this.garage.cars[0];
    this.secondCar = this.garage.cars[1];
    this.thirdCar = this.garage.cars[2];

    this.liked = [];

    this.user$ = this.garagesService.findUserByEmail(localStorage.getItem("email"));
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
      const like$ = this.garagesService.likeGarage(garageName, email).subscribe(()=>{}, (err) => { alert("Error: " + err.error.message + ""); if(!err) {
        this.numberOfLikes++;
      }});
    }

  }

}