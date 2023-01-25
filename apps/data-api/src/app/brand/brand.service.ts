import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { brand } from '@car-net/entity-ui/components';
// import { Brand, BrandDocument } from './brand.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
      models: [],
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Audi_Logo.svg/1200px-Audi_Logo.svg.png',
    },
  ];

  brandId: number = this.brandlist.length;

   constructor() {console.log('BrandService aangemaakt');}
//@InjectModel(Brand.name) private exerciseModel: Model<BrandDocument> IN CONSTRUCTOR TUSSEN ()
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
    this.brandlist.splice(this.brandlist.findIndex(b => b.id === brand.id), 1, this.brand);
    console.log(`brand met ID ${brand?.id} geüpdatet`);
    return of({
      status: 201,
      message: 'success',
    });
  }

  delete(brandId: number): Observable<any> {
    this.brandlist.splice(this.brandlist.findIndex(t => t.id === brandId), 1);
    console.log(`brand met ID ${brandId} verwijderd`);
      return of ({
        status: 201,
        message: 'success',
      });
    }
}