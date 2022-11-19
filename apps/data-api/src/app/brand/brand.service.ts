import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BrandModule } from '@car-net/entity-ui/components';
import { brand } from '@car-net/entity-ui/components';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private brand?: brand;
  private brandlist: brand[] = [
    {
      id: 1000,
      name: 'Audi',
      established: new Date('1909-5-16'),
      countryOfOrigin: 'Germany',
      brands: [],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Audi_Logo.svg/1200px-Audi_Logo.svg.png',
    },
  ];

  brandId: number = this.brandlist.length;

  constructor() {console.log('BrandService aangemaakt');}

  getList(): Observable<brand[]> {
    console.log('Brand getList aangeroepen');
    console.log(this.brandlist);
    return of(this.brandlist);
  }

  getById(id: number): Observable<brand> {
    console.log('Brand getById aangeroepen');
    console.log(`Brand met ID ${id} gezocht`);
    return of(this.brandlist.filter((item) => item.id === id)[0]);
  }

  create(brand: brand): Observable<any> {
    console.log('brand create aangeroepen');
    this.brand = { ...brand };
    this.brand.id = ++this.brandId;
    this.brandlist.push(this.brand);
    console.log(`Nieuwe brand toegevoegd met ID ${this.brandId}`);
    return of({
      status: 201,
      message: 'success',
    });
  }

  update(brand: brand): Observable<any> {
    console.log('brand update aangeroepen');
    this.brand = { ...brand };
    this.brandlist.forEach(t => {
      if(this.brand != null && t.id == this.brand.id) {
        this.brandlist.splice(this.brandId-1, 1, this.brand);
      }
    });
    // if(this.brand != undefined && this.brand.id === brand?.id) {
    // this.brandlist.splice(this.brandlist.findIndex((item) => item.id === brand?.id), 1, this.brand);
    // }
    console.log(`brand met ID ${brand?.id} geüpdatet`);
    return of({
      status: 201,
      message: 'success',
    });
  }
}