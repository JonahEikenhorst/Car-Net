import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInterface } from "@car-net/interfaces";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AuthService {

    constructor(private http:HttpClient) {

    }

    login(email:string, password:string): Observable<UserInterface> {
        return this.http.post<UserInterface>('http://localhost:3333/api/login', {email, password})
    }

    register() {
        return this.http.post('/api/register', {})
    }
}