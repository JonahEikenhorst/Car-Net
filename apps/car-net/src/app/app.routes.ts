import { Route } from '@angular/router';
import { AboutComponent } from './Pages/About/about.component';
import { LoginComponent } from './Pages/Auth/login/login.component';
import { RegisterComponent } from './Pages/Auth/register/register.component';
import { GarageComponent } from './Pages/Garage/Garage-Page/garage.component';
import { HomeComponent } from './Pages/Home/Home-Page/home.component';
import { CatalogComponent } from './Pages/Catalog/Catalog-Page/catalog.component';
import { GaragesComponent } from './Pages/Garages/Garages-Page/garages.component';
import { GarageCreateComponent } from './Pages/Garage/Garage-Create/garage-create.component';
import { CatalogDetailComponent } from './Pages/Catalog/Catalog-Detail/catalog-detail.component';
import { AuthorGuard } from './Pages/Auth/author.guard';
 
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'home', pathMatch: 'full', component: HomeComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'garage', pathMatch: 'full', component: GarageComponent },
    { path: 'catalog', pathMatch: 'full', component: CatalogComponent },
    { path: 'catalog/:numberPlate', pathMatch: 'full', component: CatalogDetailComponent},
    { path: 'garages', pathMatch: 'full', component: GaragesComponent },
    { path: 'garagecreate', pathMatch : 'full', component: GarageCreateComponent },
    { path: 'brands', loadChildren: () => import ('./Components/brand/brand.module').then(m => m.BrandModule) },
];
