/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CarInterface, GarageInterface, UserInterface } from "@car-net/interfaces";

@Injectable({
  providedIn: "root"
})
export class GarageService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>("http://localhost:3333/api/cars");
  }

  findOneUser(id: string | null): Observable<UserInterface> {
    return this.http.get<UserInterface>(`http://localhost:3333/api/users/${id}`);
  }

  findMyCars(email: string | null): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(`http://localhost:3333/api/garages/cars/${email}`);
  }

  createGarage(garageName: string | null, email: string | null): Observable<GarageInterface> {
    return this.http.post<GarageInterface>("http://localhost:3333/api/garages", { garageName, email });
  }
  

}