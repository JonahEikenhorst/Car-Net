import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../Pages/Auth/auth.service";
import { BehaviorSubject, Observable, Observer } from "rxjs";
import { IdentityInterface } from "@car-net/interfaces";
import { CatalogService } from "../../Pages/Catalog/catalog.service";


@Component({
  selector: "car-net-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  loggedInUser$: BehaviorSubject<IdentityInterface | undefined> = new BehaviorSubject<IdentityInterface | undefined>(undefined);
  loggedOut = false;
  email = localStorage.getItem("email");
  $admin = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.catalogService.findUserByEmail(this.email).subscribe((user) => {
      if (user.roles.includes("Admin")) {
        this.$admin.next(true);
      }
    });
  }



  logout(): void {
    this.authService.logout();
    this.$admin.next(false);
    
setTimeout(()=>{
  this.loggedOut=false;
  },5000) 
  this.loggedOut=true;  
  }
}