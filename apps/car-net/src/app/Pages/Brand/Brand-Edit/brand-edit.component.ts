/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../Auth/auth.service";
import { BrandService } from "../brand.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, map } from "rxjs";
import { BrandInterface } from "@car-net/interfaces";
import * as moment from 'moment';

@Component({
  selector: "car-net-brand-edit",
  templateUrl: "./brand-edit.component.html",
  styleUrls: ["./brand-edit.component.css"]
})
export class BrandEditComponent implements OnInit {
  brandForm!: FormGroup;
  createBrand = false;
    brandName: string;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private brandService: BrandService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
        this.brandName = params['brandName'];
    });
    this.createBrand = !this.brandName;

    this.brandForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      established: new FormControl("", [Validators.required, this.dateValidator]),
      countryOfOrigin: new FormControl("", [Validators.required, Validators.minLength(2)]),
      logoUrl: new FormControl("", [Validators.required, Validators.minLength(4)])
    }) as FormGroup;

    if(!this.createBrand) {
      this.brandService.findBrandbyName(this.brandName).subscribe((brand) => {
        this.brandForm.setValue({
          name: brand.name,
          established: brand.established,
          countryOfOrigin: brand.countryOfOrigin,
          logoUrl: brand.logoUrl,
        });
      });
    }

  }

  get name() {
    return this.brandForm.get("name")!;
  }

  get established() {
    return this.brandForm.get("established")!;
  }

  get countryOfOrigin() {
    return this.brandForm.get("countryOfOrigin")!;
  }

  get logoUrl() {
    return this.brandForm.get("logoUrl")!;
  }

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (!date.isBefore(today)) {
        return { 'invalidDate': true }
      }
    }
    return {};
  }
  async onSubmit() {
    const changes: Partial<BrandInterface> = {
        ...this.brandForm.value};

    if (this.brandForm.invalid) {
      return;
    }
    if (this.createBrand) {
        this.brandService.createBrand(changes).subscribe(() => {this.router.navigateByUrl("/brand")})
    } else if (!this.createBrand) {
         this.brandService.updateBrand(changes).subscribe(() => {this.router.navigateByUrl("/brand")})
    }

  }
}