import { Route } from '@angular/router';
import { AboutComponent } from './Pages/About/about.component';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { HomeComponent } from './Pages/Home/home.component';
 
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'home', pathMatch: 'full', component: HomeComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'brands', loadChildren: () => import ('./Components/brand/brand.module').then(m => m.BrandModule) },

//     { path: 'brands',
//     loadChildren: () =>
//       import('@car-net/entity-ui/components').then((m) => m.BrandModule),
// },
//     { path: 'models', loadChildren: () => 
//       import('@car-net/entity-ui/components').then((m) => m.ModelModule) },
];
