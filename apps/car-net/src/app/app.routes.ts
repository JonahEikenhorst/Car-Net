import { Route } from '@angular/router';
import { AboutComponent } from './Pages/About/about.component';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { GarageComponent } from './Pages/Garage/Garage-Page/garage.component';
import { HomeComponent } from './Pages/Home/home.component';
 
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'home', pathMatch: 'full', component: HomeComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'garage', pathMatch: 'full', component: GarageComponent },
    { path: 'garage', loadChildren: () => import ('./Pages/Garage/garage.module').then(m => m.GarageModule) },
    { path: 'brands', loadChildren: () => import ('./Components/brand/brand.module').then(m => m.BrandModule) },
];
