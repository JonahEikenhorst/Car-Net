import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import  { AuthService } from "../auth.service";

@Component({
    selector: 'car-net-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
          email: ['test@gmail.com', [Validators.required, Validators.email]],
          password: ['testtest', [Validators.required, Validators.minLength(8)]]
        });
    }    
    

    ngOnInit(): void {}

login() {

      const val = this.form.value;

      this.authService.login(val.email, val.password)
          .subscribe(
              (reply:any) => {

                  localStorage.setItem("authJwtToken",
                      reply.authJwtToken);

                  this.router.navigateByUrl('/courses');

              },
              err => {
                  console.log("Login failed:", err);
                  alert('Login failed.');
              }
          );


  }
}