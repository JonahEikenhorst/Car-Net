/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CarInterface, GarageInterface, UserInterface } from "@car-net/interfaces";

@Injectable({
  providedIn: "root"
})
export class CatalogService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<GarageInterface[]> {
    return this.http.get<GarageInterface[]>("https://car-net.up.railway.app/api/garages");
  }

  findUserByEmail(email: string | null): Observable<UserInterface> {
    return this.http.get<UserInterface>(`https://car-net.up.railway.app/api/users/email/${email}`);
  }
  
  findOneUser(id: string | null): Observable<UserInterface> {
    return this.http.get<UserInterface>(`https://car-net.up.railway.app/api/users/${id}`);
  }

  findMyCars(email: string | null): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>(`https://car-net.up.railway.app/api/garages/cars/${email}`);
  }

  likeGarage(garageName: string | null, email: string | null): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`https://car-net.up.railway.app/api/garages/like/${garageName}/${email}`);
  }

  findGarageByName(garageName: string): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`https://car-net.up.railway.app/api/garages/name/${garageName}`);
  }
  
  findIdByName(garageName: string): Observable<string> {
    return this.http.get<string>(`https://car-net.up.railway.app/api/garages/garageId/${garageName}`);
  }

  getCars(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>("https://car-net.up.railway.app/api/cars");
  }

  findCarByNumberPlate(numberPlate: string): Observable<CarInterface> {
    return this.http.get<CarInterface>(`https://car-net.up.railway.app/api/cars/numberPlate/${numberPlate}`);
  }

  addCarToGarage(email: string | null, numberPlate: string | null): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`https://car-net.up.railway.app/api/garages/cars/add/${numberPlate}/${email}`);
  }

  removeCarFromGarage(email: string | null, numberPlate: string | null): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`https://car-net.up.railway.app/api/garages/cars/remove/${numberPlate}/${email}`);
  }
}