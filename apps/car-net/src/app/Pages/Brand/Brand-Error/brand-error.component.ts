import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BrandInterface } from "@car-net/interfaces";

@Component({
  selector: "car-net-brand-error",
  templateUrl: "./brand-error.component.html",

})
export class BrandErrorComponent implements OnInit {
  @Input()
  brand: BrandInterface;
  timer: number;
  timeLeft = 5;
  interval: NodeJS.Timer;

  constructor(private router: Router) { }
  ngOnInit() {
    setTimeout(() => {
    this.router.navigateByUrl('/home');
    }, 5000);
    this.startTimer();
  
}
  startTimer() {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 60;
        }
      },1000)
    }

}