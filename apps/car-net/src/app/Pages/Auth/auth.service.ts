import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { UserCredentials, UserInterface, UserRegistration } from "@car-net/interfaces";
import { HttpClient } from "@angular/common/http";
import { UserService } from "@car-net/interfaces";
import { IdentityInterface } from "@car-net/interfaces";
import { Location } from "@angular/common";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {
    public currentUser$ = new BehaviorSubject<IdentityInterface | undefined>(undefined);
    private readonly CURRENT_USER = "currentUser";
  
    constructor(private http: HttpClient, private userService: UserService, private location: Location, private router: Router) {
      const currentUser = localStorage.getItem(this.CURRENT_USER);
      const id = localStorage.getItem("id");
      if (currentUser) {
        this.currentUser$.next(JSON.parse(currentUser));
      }
    }

    login(credentials: UserCredentials): Observable<IdentityInterface> {
        return this.http.post<any>("https://car-net.up.railway.app/api/login", credentials)
          .pipe(
            map((identity) => {
              // Substract token due to typescript
              const rawtoken = identity.token;
              const id = rawtoken._id;
              const email = rawtoken.email;

              localStorage.setItem(this.CURRENT_USER, JSON.stringify(identity));
              localStorage.setItem("id", id);
              localStorage.setItem("email", email);
              this.currentUser$.next(identity);
              return identity;
            }),
            catchError((err) => {
              throw err;
            })
          );
      }

      register(credentials: UserRegistration): Observable<UserInterface> {
        return this.http.post<UserInterface>("https://car-net.up.railway.app/api/register", credentials)
          .pipe(
            map((user) => {
              return user;
            }),
            catchError((err) => {
              throw err;
            })
          );
      }

      logout(): void {
        localStorage.removeItem(this.CURRENT_USER);
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        this.currentUser$.next(undefined);
        this.router.navigateByUrl("/login");
      }
    
      get currentUser(): Observable<UserInterface | undefined> {
        const currentUser = this.currentUser$.value;
    
        if (currentUser) {
          return this.userService.findOneByEmail(currentUser.email);
        }
    
        return of(undefined);
      }
}