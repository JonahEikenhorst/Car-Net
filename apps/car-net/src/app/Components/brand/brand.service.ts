import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandInterface } from '@car-net/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<BrandInterface[]> {
    return this.http.get<BrandInterface[]>('/api/brands');
  }
}
