import { TestBed } from '@angular/core/testing';

import { GarageService } from './garage.service';
import { HttpClient, HttpHandler } from "@angular/common/http";
import { GarageInterface } from '@car-net/interfaces';

describe('GarageService', () => {
  let service: GarageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(GarageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of cars', () => {
    expect(service.findAll()).toBeTruthy();
  });

  it('should return a user', () => {
    expect(service.findOneUser('5f9f1b0b0b1b1b1b1b1b1b1b')).toBeTruthy();
    });

    it('should create a garage', () => {
        expect(service.createGarage('test', 'email@gmail.com')).toBeTruthy();
        });

    it('should create a garage ', () => {
        const garageName = "test";
        const email = "Test@gmail.com";
    service.createGarage(garageName, email).subscribe((garage: GarageInterface) => {
            expect(garage).toEqual(garage.garageName === (garageName)); }); });
});