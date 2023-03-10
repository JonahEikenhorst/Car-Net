// /* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { Component, OnInit } from "@angular/core";
// import { AuthService } from "@car-net/data-api/lib/auth/auth.service";
// import { Router } from "@angular/router";
// import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
// import { catchError, map } from "rxjs";

// @Component({
//   selector: "car-net-register",
//   templateUrl: "./register.component.html",
//   styleUrls: ["./register.component.css"]
// })
// export class RegisterComponent implements OnInit {
//   registerForm!: FormGroup;

//   constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
//   }

//   ngOnInit(): void {
//     this.registerForm = this.formBuilder.group({
//       username: new FormControl("", [Validators.required]),
//       email: new FormControl("", [Validators.required, Validators.email]),
//       password: new FormControl("", [Validators.required, Validators.minLength(8)]),
//       repeatPassword: new FormControl("", [Validators.required, Validators.minLength(8)])
//     }) as FormGroup;
//   }

//   get username() {
//     return this.registerForm.get("username")!;
//   }

//   get email() {
//     return this.registerForm.get("email")!;
//   }

//   get password() {
//     return this.registerForm.get("password")!;
//   }

//   get repeatPassword() {
//     return this.registerForm.get("repeatPassword")!;
//   }

//   async register() {
//     if (this.registerForm.invalid) {
//       return;
//     }

//     this.authService.register(this.registerForm.value)
//       .pipe(
//         map((token) => {
//           if (token) {
//             this.router.navigate(["/"]);
//           }
//         }),
//         catchError((err) => {
//           this.registerForm.setErrors({ invalidCredentials: true, message: err.error.message });
//           throw err;
//         })
//       ).subscribe();
//   }
// }