import { Route } from '@angular/router';
import { AboutComponent } from './Pages/About/about.component';

export const appRoutes: Route[] = [
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'brands',
    loadChildren: () =>
      import('@car-net/entity-ui/components').then((m) => m.BrandModule),
},
];
