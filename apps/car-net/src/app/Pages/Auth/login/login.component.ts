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
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }
    

    ngOnInit() { }

    login() {
        const val = this.form.value;
        this.authService.login(val.email, val.password)
        .subscribe(
            (reply:any) => {
                localStorage.setItem('authJwtToken', reply.authJwtToken);
            this.router.navigateByUrl('/garages');
        },
        err => {
            console.log("Error logging in: " + err);	
            alert('Login Failed. Please try again.');
        }
        );
    }
}