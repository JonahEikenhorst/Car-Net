/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CarInterface, UserInterface } from "@car-net/interfaces";

@Injectable({
  providedIn: "root"
})
export class GarageService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>("http://localhost:3333/api/cars");
  }

  findOne(id: string | null): Observable<CarInterface> {
    return this.http.get<CarInterface>(`http://localhost:3333/api/cars/${id}`);
  }

  findOneUser(id: string | null): Observable<UserInterface> {
    return this.http.get<UserInterface>(`/api/user/${id}`);
  }
}