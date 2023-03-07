import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { Brand } from 'apps/data-api/src/app/brand/brand.schema';
import { BrandService } from 'apps/data-api/src/app/brand/brand.service';

@Component({
  selector: 'car-net-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css'],
})
export class BrandEditComponent implements OnInit, OnDestroy {
  subscriptionParams?: Subscription;
  brand = new Brand();
  brand$?: Observable<Brand>;
  existingBrandName$?: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,

  ) {}

  ngOnInit(): void {
    // Haal de brand op voor edit
    this.subscriptionParams = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          // als we een nieuw item maken is er geen 'id'
          if (!params.get('id')) {
            // maak een lege brand
            // return of(this.brand);
            return of(this.brand);
          } else {
            // haal de brand met gevraagde id via de api
            return this.brandService.getById(Number(params.get('id')));
          }
        }),
        tap(console.log)
      )
      .subscribe((brand) => {
        // Spread operator om deep copy van brand te maken => op deze manier wordt
        // de brand niet geupdatet bij een "Cancel" of zonder dat een update() uitegevoerd wordt.
        this.brand = { ...brand };
      });
  }
  // Save brand via the service
  onSubmit(): void {
    console.log('onSubmit', this.brand);
    // Update exiting brand
    if (this.brand.id != 0) {
      this.brandService
        .update(this.brand)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            throw 'error in source. Details: ' + error;
            // this.alertService.error(error.message);
            // return of(false);
          })
        )
        .subscribe((success: any) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    }
    // Create a new brand
    else {
      this.brandService
        .create(this.brand)
        .pipe(
          catchError((error: any) => {
            console.log(error);
            throw 'error in source. Details: ' + error;
            // this.alertService.error(error.message);
            // return of(false);
          })
        )
        .subscribe((success: any) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    }
  }

  onDelete(brandId: number): void {
    this.brandService
      .delete(brandId)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          throw 'error in source. Details: ' + error;
          // this.alertService.error(error.message);
          // return of(false);
        })
      )
      .subscribe((success: any) => {
        console.log(success);
        if (success) {
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      });
  }
  ngOnDestroy(): void {
    this.subscriptionParams?.unsubscribe;
  }
}