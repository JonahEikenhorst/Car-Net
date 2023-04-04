/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, map } from "rxjs";

@Component({
  selector: "car-net-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loggedIn = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required]),
      hash: new FormControl("", [Validators.required])
    }) as FormGroup;
  }

  get email() {
    return this.loginForm.get("email")!;
  }

  get hash() {
    return this.loginForm.get("hash")!;
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value)
      .pipe(
        map((token) => {
          if (token) {
            this.router.navigate(["/"]);
          }
        }),
        catchError((err) => {
          this.loginForm.setErrors({ invalidCredentials: true, message: err.error.message });
          throw err;
        })
      ).subscribe();
  }
}