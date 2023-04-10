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
    return this.http.get<GarageInterface[]>("https://car-net.up.railway.app/api/garages");
  }

  findAllCars(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>("https://car-net.up.railway.app/api/cars");
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

  removeLike(garageName: string | null, email: string | null): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`https://car-net.up.railway.app/api/garages/unlike/${garageName}/${email}`);
  }


  findGarageByName(garageName: string): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`https://car-net.up.railway.app/api/garages/name/${garageName}`);
  }
  
  findIdByName(garageName: string): Observable<string> {
    return this.http.get<string>(`https://car-net.up.railway.app/api/garages/garageId/${garageName}`);
  }

  findRecommendedGarages(email: string | null): Observable<GarageInterface[]> {
    return this.http.get<GarageInterface[]>(`https://car-net.up.railway.app/api/garages/recommendedGarages/${email}`);
  }
}