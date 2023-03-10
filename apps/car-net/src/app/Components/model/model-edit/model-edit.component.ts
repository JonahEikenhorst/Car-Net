// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { catchError, Observable, of, Subscription, switchMap, tap } from 'rxjs';
// import { Model } from 'apps/data-api/src/app/model/model.schema';
// import { ModelService } from 'apps/data-api/src/app/model/model.service';

// @Component({
//   selector: 'car-net-model-edit',
//   templateUrl: './model-edit.component.html',
//   styleUrls: ['./model-edit.component.css'],
// })
// export class ModelEditComponent implements OnInit, OnDestroy {
//   subscriptionParams?: Subscription;
//   model = new Model();
//   model$?: Observable<Model>;
//   existingmodelName$?: Observable<string>;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private modelService: ModelService,

//   ) {}

//   ngOnInit(): void {
//     // Haal de model op voor edit
//     this.subscriptionParams = this.route.paramMap
//       .pipe(
//         tap(console.log),
//         switchMap((params: ParamMap) => {
//           // als we een nieuw item maken is er geen 'id'
//           if (!params.get('id')) {
//             // maak een lege model
//             // return of(this.model);
//             return of(this.model);
//           } else {
//             // haal de model met gevraagde id via de api
//             return this.modelService.getById(Number(params.get('id')));
//           }
//         }),
//         tap(console.log)
//       )
//       .subscribe((model) => {
//         // Spread operator om deep copy van model te maken => op deze manier wordt
//         // de model niet geupdatet bij een "Cancel" of zonder dat een update() uitegevoerd wordt.
//         this.model = { ...model };
//       });
//   }
//   // Save model via the service
//   onSubmit(): void {
//     console.log('onSubmit', this.model);
//     // Update exiting model
//     if (this.model.id != 0) {
//       this.modelService
//         .update(this.model)
//         .pipe(
//           catchError((error: any) => {
//             console.log(error);
//             throw 'error in source. Details: ' + error;
//             // this.alertService.error(error.message);
//             // return of(false);
//           })
//         )
//         .subscribe((success: any) => {
//           console.log(success);
//           if (success) {
//             this.router.navigate(['..'], { relativeTo: this.route });
//           }
//         });
//     }
//     // Create a new model
//     else {
//       this.modelService
//         .create(this.model)
//         .pipe(
//           catchError((error: any) => {
//             console.log(error);
//             throw 'error in source. Details: ' + error;
//             // this.alertService.error(error.message);
//             // return of(false);
//           })
//         )
//         .subscribe((success: any) => {
//           console.log(success);
//           if (success) {
//             this.router.navigate(['..'], { relativeTo: this.route });
//           }
//         });
//     }
//   }

//   onDelete(modelId: number): void {
//     this.modelService
//       .delete(modelId)
//       .pipe(
//         catchError((error: any) => {
//           console.log(error);
//           throw 'error in source. Details: ' + error;
//           // this.alertService.error(error.message);
//           // return of(false);
//         })
//       )
//       .subscribe((success: any) => {
//         console.log(success);
//         if (success) {
//           this.router.navigate(['../../'], { relativeTo: this.route });
//         }
//       });
//   }
//   ngOnDestroy(): void {
//     this.subscriptionParams?.unsubscribe;
//   }
// }