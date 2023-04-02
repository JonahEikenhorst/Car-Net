import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../Pages/Auth/auth.service";
import { BehaviorSubject } from "rxjs";
import { IdentityInterface } from "@car-net/interfaces";


@Component({
  selector: "car-net-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  loggedInUser$: BehaviorSubject<IdentityInterface | undefined> = new BehaviorSubject<IdentityInterface | undefined>(undefined);
  loggedin = false;
  loggedOut = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
    
setTimeout(()=>{
  this.loggedOut=false;
  },5000) 
  this.loggedOut=true;  
  }
}