/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { CarInterface } from '@car-net/interfaces';
import { Observable } from 'rxjs';
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
  constructor(private garageService: GarageService) {}

}
