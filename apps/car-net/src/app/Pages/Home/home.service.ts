/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CarInterface, GarageInterface, UserInterface } from "@car-net/interfaces";

@Injectable({
  providedIn: "root"
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<GarageInterface[]> {
    return this.http.get<GarageInterface[]>("http://localhost:3333/api/garages");
  }

  findAllCars(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>("http://localhost:3333/api/cars");
  }

  findUserByEmail(email: string | null): Observable<UserInterface> {
    return this.http.get<UserInterface>(`http://localhost:3333/api/users/email/${email}`);
  }

  findOneUser(id: string | null): Observable<UserInterface> {
    return this.http.get<UserInterface>(`http://localhost:3333/api/users/${id}`);
  }

  findMyCars(email: string | null): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(`http://localhost:3333/api/garages/cars/${email}`);
  }

  likeGarage(garageName: string | null, email: string | null): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`http://localhost:3333/api/garages/like/${garageName}/${email}`);
  }

  findGarageByName(garageName: string): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`http://localhost:3333/api/garages/name/${garageName}`);
  }
  
  findIdByName(garageName: string): Observable<string> {
    return this.http.get<string>(`http://localhost:3333/api/garages/garageId/${garageName}`);
  }

  findRecommendedGarages(email: string | null): Observable<GarageInterface[]> {
    return this.http.get<GarageInterface[]>(`http://localhost:3333/api/garages/recommendedGarages/${email}`);
  }
}