/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, Input } from '@angular/core';
import { CarInterface, UserInterface } from '@car-net/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '../../Auth/auth.service';
import { GarageService } from '../garage.service';

@Component({
  selector: 'car-net-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.css'],
})
export class GarageComponent {
  cars$: Observable<CarInterface[]> = new Observable<CarInterface[]>(
    (observer) => {
      this.garageService.findAll().subscribe((cars) => observer.next(cars));
    }
  );

  @Input()
  user$: Observable<UserInterface> = new Observable<UserInterface>(observer => {
    this.authService.currentUser.subscribe((user) => observer.next(user));
  });
  
  constructor(private garageService: GarageService, private authService: AuthService) {}

}
