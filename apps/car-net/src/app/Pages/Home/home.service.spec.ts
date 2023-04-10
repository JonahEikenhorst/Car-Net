import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { HttpClient, HttpHandler } from "@angular/common/http";

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(HomeService);
  });

    it('should be created', () => {
        expect(service).toBeTruthy();
        }
    );

    it('should return a list of garages', () => {
        expect(service.findAll()).toBeTruthy();
        }
    );
    
    it('should return a list of cars', () => {
        expect(service.findAllCars()).toBeTruthy();
        }
    );

    it('should find a user by email', () => {
        expect(service.findUserByEmail('test@gmail.com')).toBeTruthy();
        }  );

});