/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { CarInterface, GarageInterface, UserInterface } from '@car-net/interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '../../Auth/auth.service';
import { GarageService } from '../garage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'car-net-garage-create',
  templateUrl: './garage-create.component.html',
  styleUrls: ['./garage-create.component.css'],
})
export class GarageCreateComponent implements OnInit {
  garageCreateForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private garageService: GarageService, private router: Router ) {}

  ngOnInit() {
    this.garageCreateForm = this.formBuilder.group({
        garageName: new FormControl("", [Validators.required]),
      }) as FormGroup;

      if(localStorage.getItem('email') == null) {
        this.router.navigateByUrl('/login');
      }
  }

    get garageName() {
    return this.garageCreateForm.get("garageName")!;
    }

  createGarage() {
    console.log(this.garageName.value, localStorage.getItem("email")!);
    const newGarage = this.garageService.createGarage(this.garageName.value, localStorage.getItem("email")!).subscribe();
    this.router.navigateByUrl("/home");
  }

}
