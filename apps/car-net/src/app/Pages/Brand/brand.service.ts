/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BrandInterface, CarInterface, GarageInterface, UserInterface } from "@car-net/interfaces";

@Injectable({
  providedIn: "root"
})
export class BrandService {

  constructor(private http: HttpClient) {
  }

  getBrands(): Observable<BrandInterface[]> {
    return this.http.get<BrandInterface[]>("http://localhost:3333/api/brands");
    }

    findBrandbyName(brandName: string): Observable<BrandInterface> {
        return this.http.get<BrandInterface>(`http://localhost:3333/api/brands/${brandName}`);
    }

    createBrand(brand: Partial<BrandInterface>): Observable<BrandInterface> {
        return this.http.post<BrandInterface>("http://localhost:3333/api/brands", brand);
    }

    updateBrand(changes: Partial<BrandInterface>): Observable<BrandInterface> {
        return this.http.put<BrandInterface>(`http://localhost:3333/api/brands/edit/${changes.name}`, changes);
    }

    removeBrand(brandName: string): Observable<BrandInterface> {
        return this.http.delete<BrandInterface>(`http://localhost:3333/api/brands/name/${brandName}`);
    }

  findAll(): Observable<GarageInterface[]> {
    return this.http.get<GarageInterface[]>("http://localhost:3333/api/garages");
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

  getCars(): Observable<CarInterface[]> {
    return this.http.get<CarInterface[]>("http://localhost:3333/api/cars");
  }

  findCarByNumberPlate(numberPlate: string): Observable<CarInterface> {
    return this.http.get<CarInterface>(`http://localhost:3333/api/cars/numberPlate/${numberPlate}`);
  }

  addCarToGarage(email: string | null, numberPlate: string | null): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`http://localhost:3333/api/garages/cars/add/${numberPlate}/${email}`);
  }

  removeCarFromGarage(email: string | null, numberPlate: string | null): Observable<GarageInterface> {
    return this.http.get<GarageInterface>(`http://localhost:3333/api/garages/cars/remove/${numberPlate}/${email}`);
  }
}