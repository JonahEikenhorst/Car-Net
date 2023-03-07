import { Route } from '@angular/router';
import { AboutComponent } from './Pages/About/about.component';
import { HomeComponent } from './Pages/Home/home.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
//     { path: 'brands',
//     loadChildren: () =>
//       import('@car-net/entity-ui/components').then((m) => m.BrandModule),
// },
//     { path: 'models', loadChildren: () => 
//       import('@car-net/entity-ui/components').then((m) => m.ModelModule) },
];
