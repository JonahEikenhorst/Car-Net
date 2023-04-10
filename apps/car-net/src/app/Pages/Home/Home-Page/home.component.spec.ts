import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from '../home.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const homeServiceMock = {
    findAllCars: jest.fn(),
    findAll: jest.fn(),
    findUserByEmail: jest.fn(),
    findOneUser: jest.fn(),
    findMyCars: jest.fn(),
    likeGarage: jest.fn(),
    removeLike: jest.fn(),
    findGarageByName: jest.fn(),
    findIdByName: jest.fn(),
    findRecommendedGarages: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent], imports: [HttpClientModule], providers: [{ provide: HomeService, useValue: homeServiceMock}],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Should get the data from the API", () => {
    it("should get featured cars" , () => {
      expect(homeServiceMock.findAllCars).toBeCalled();
    });

    it("should get featured garages" , () => {
      expect(homeServiceMock.findAll).toBeCalled();
    }
    )
  
    it("should get user by email" , () => {
      expect(homeServiceMock.findUserByEmail).toBeCalled();
    });

  });


});
