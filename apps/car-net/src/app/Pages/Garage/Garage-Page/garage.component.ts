/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { CarInterface, GarageInterface, UserInterface } from '@car-net/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '../../Auth/auth.service';
import { GarageService } from '../garage.service';

@Component({
  selector: 'car-net-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css'],
})
export class GarageComponent implements OnInit {
  username: string | undefined;
  garage$: Observable<GarageInterface>;
  user$: Observable<UserInterface> | undefined;
  owner: UserInterface | undefined;
  email: string | null = localStorage.getItem('email');
  cars$: Observable<CarInterface[]> | undefined;

  
  constructor(private garageService: GarageService, private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.garageService.findOneUser(this.email);
    
    this.cars$ = this.garageService.findMyCars(this.email);
    
    this.user$.subscribe((user) => { this.username = user.username;});
  }

}
