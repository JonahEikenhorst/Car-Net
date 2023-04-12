/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../Auth/auth.service";
import { CatalogService } from "../catalog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, map } from "rxjs";
import { CarInterface } from "@car-net/interfaces";

@Component({
  selector: "car-net-car-edit",
  templateUrl: "./catalog-edit.component.html",
  styleUrls: ["./catalog-edit.component.css"]
})
export class CarEditComponent implements OnInit {
  carForm!: FormGroup;
  createCar = false;
  carNumberPlate: string;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.carNumberPlate = params['numberPlate'];
    });
    this.createCar = !this.carNumberPlate;

    this.carForm = this.formBuilder.group({
      brand: new FormControl("", [Validators.required, Validators.minLength(2)]),
      country: new FormControl("", [Validators.required]),
      year: new FormControl("", [Validators.required, Validators.minLength(2)]),
    }) as FormGroup;

    if(!this.createCar) {
      this.catalogService.findCarByNumberPlate(this.carNumberPlate).subscribe((car) => {
        console.log(car.brand)
        console.log(this.carNumberPlate)
        this.carForm.setValue({
          brand: car.brand,
          country: car.country,
          year: car.year,
        });
      });
    }
  }

  get brand() {
    return this.carForm.get("brand")!;
  }

  get country() {
    return this.carForm.get("country")!;
  }

  get year() {
    return this.carForm.get("year")!;
  }

  async onSubmit() {
    const changes: Partial<CarInterface> = {
        ...this.carForm.value };

    if (this.carForm.invalid) {
      return;
    }
    if (this.createCar) {
        this.catalogService.createCar(changes).subscribe(() => {this.router.navigateByUrl("/catalog")})
    } else if (!this.createCar) {
         this.catalogService.updateCar(changes, this.carNumberPlate ).subscribe(() => {this.router.navigateByUrl("/catalog")})
    }

  }
}