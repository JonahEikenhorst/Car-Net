import { Component, OnInit } from "@angular/core";
import { CarInterface, GarageInterface, UserInterface } from "@car-net/interfaces";
import { Observable } from "rxjs";
import { HomeService } from "../home.service";



@Component({
  selector: "car-net-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  cars$: Observable<CarInterface[]> | undefined;
  garages$: Observable<GarageInterface[]> | undefined;
  user$: Observable<UserInterface> | undefined;

  likeddGarages: GarageInterface[]; 

  garage1: string;

  
  constructor(private homeService: HomeService) {
  }


  ngOnInit() {
  this.cars$ = this.homeService.findAllCars();
  this.garages$ = this.homeService.findAll();


  // this.user$ = this.homeService.findUserByEmail(localStorage.getItem("email"));
  // this.user$.subscribe((user) => { this.garage1 = user.likedGarages[0]});

  // this.user$.subscribe((user) => { 
  //   for(const garage in user.likedGarages) { 
  //     this.homeService.findGarageByName(garage).subscribe((garage) => { console.log(garage);
  //       this.likeddGarages.push(garage); 
  //     });
  //   }
  //  });
  }
}