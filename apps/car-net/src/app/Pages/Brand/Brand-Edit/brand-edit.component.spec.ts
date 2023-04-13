import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrandEditComponent } from './brand-edit.component';
import { BrandService } from '../brand.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../Auth/auth.service';

describe('Brand-EditComponent', () => {
  let component: BrandEditComponent;
  let fixture: ComponentFixture<BrandEditComponent>;

    const dummyBrand = { 
    name: "dummyBrand",
    countryOfOrigin: "Germany",
    established: 1909,
    logoUrl: "https://www.google.com",
    }


  const brandServiceMock = {
    findAllCars: jest.fn(),
    findAll: jest.fn(),
    findUserByEmail: jest.fn(),
    findOneUser: jest.fn(),
    findMyCars: jest.fn(),
    likeGarage: jest.fn(),
    removeLike: jest.fn(),
    findGarageByName: jest.fn(),
    findIdByName: jest.fn(),
    findRecommendedGarages: jest.fn(),
    findBrandByName: jest.fn(),
    createBrand: jest.fn(),
    updateBrand: jest.fn(),
    removeBrand: jest.fn()
  }

  const activatedRouteMock = {
    snapshot: {url: 'Create'},
    params: of({}),
    parent: {
      parent: {
        params: of({}),
      },
      params: of({}),
    }
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandEditComponent], imports: [HttpClientModule], providers: [FormBuilder, AuthService, { provide: BrandService, useValue: brandServiceMock}, {provide: ActivatedRoute, useValue: activatedRouteMock}],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should not call removeBrand' , () => {
    it('should not call removeBrand', () => {
      expect(brandServiceMock.removeBrand).not.toHaveBeenCalled();
    });
  });

  describe('Make the form for create mode', () => {
    beforeEach(() => {
        activatedRouteMock.snapshot.url = 'Edit';

        fixture = TestBed.createComponent(BrandEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
  })

    it('should call createBrand', () => {
      component.brandForm.setValue(dummyBrand);
      component.onSubmit();
      expect(brandServiceMock.createBrand).toHaveBeenCalled();
    });

    it('should fill the form with the data of the brand', () => {
        component.brandForm.setValue(dummyBrand);
        expect(component.brandForm.value).toEqual(dummyBrand);
        });

    it('should fail when the form is not valid', () => {
        component.brandForm.setValue(dummyBrand);
        component.brandForm.controls['name'].setValue('');
        component.onSubmit();
        expect(brandServiceMock.createBrand).toHaveBeenCalled();
    });
});

    describe('Make the form for edit mode', () => {
        beforeEach(() => {
            activatedRouteMock.snapshot.url = 'Edit/dummyBrand';

            fixture = TestBed.createComponent(BrandEditComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        })

        it('should call updateBrand', () => {
            component.brandForm.setValue(dummyBrand);
            component.onSubmit();
            expect(component.brandForm.value).toEqual(dummyBrand);
        });

        it('should fill the form with the data of the brand', () => {
            component.brandForm.setValue(dummyBrand);
            expect(component.brandForm.value).toEqual(dummyBrand);
        });

        it('should fail when the form is not valid', () => {
            component.brandForm.setValue(dummyBrand);
            component.brandForm.controls['name'].setValue('');
            component.onSubmit();
            expect(brandServiceMock.updateBrand).not.toHaveBeenCalled();
        });
    });
});