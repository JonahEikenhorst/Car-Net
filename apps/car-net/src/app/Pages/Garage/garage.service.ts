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
    return this.http.get<CarInterface[]>("https://car-net.up.railway.app/api/cars");
  }

  findOneUser(id: string | null): Observable<UserInterface> {
    return this.http.get<UserInterface>(`https://car-net.up.railway.app/api/users/${id}`);
  }

  findMyCars(email: string | null): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(`https://car-net.up.railway.app/api/garages/cars/${email}`);
  }

  createGarage(garageName: string | null, email: string | null): Observable<GarageInterface> {
    return this.http.post<GarageInterface>("https://car-net.up.railway.app/api/garages", { garageName, email });
  }
  

}