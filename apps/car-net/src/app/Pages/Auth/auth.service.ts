import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { UserCredentials, UserInterface, UserRegistration } from "@car-net/interfaces";
import { HttpClient } from "@angular/common/http";
import { UserService } from "@car-net/interfaces";
import { IdentityInterface } from "@car-net/interfaces";
import { Location } from "@angular/common";


@Injectable()
export class AuthService {
    public currentUser$ = new BehaviorSubject<IdentityInterface | undefined>(undefined);
    private readonly CURRENT_USER = "currentUser";
  
    constructor(private http: HttpClient, private userService: UserService, private location: Location) {
      const currentUser = localStorage.getItem(this.CURRENT_USER);
      if (currentUser) {
        this.currentUser$.next(JSON.parse(currentUser));
      }
    }

    login(credentials: UserCredentials): Observable<IdentityInterface> {
        return this.http.post<IdentityInterface>("http://localhost:3333/api/login", credentials)
          .pipe(
            map((identity) => {
              localStorage.setItem(this.CURRENT_USER, JSON.stringify(identity));
              this.currentUser$.next(identity);
              return identity;
            }),
            catchError((err) => {
              throw err;
            })
          );
      }

      register(credentials: UserRegistration): Observable<UserInterface> {
        return this.http.post<UserInterface>("http://localhost:3333/api/register", credentials)
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
        this.currentUser$.next(undefined);
        this.location.back();
      }
    
      get currentUser(): Observable<UserInterface | undefined> {
        const currentUser = this.currentUser$.value;
    
        if (currentUser) {
          return this.userService.findOneByEmail(currentUser.email);
        }
    
        return of(undefined);
      }
}