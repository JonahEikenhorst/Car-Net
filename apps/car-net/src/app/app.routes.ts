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
import { BrandComponent } from './Pages/Brand/Brand-Page/brand.component';
import { BrandDetailComponent } from './Pages/Brand/Brand-Detail/brand-detail.component';
import { BrandEditComponent } from './Pages/Brand/Brand-Edit/brand-edit.component';
import { BrandErrorComponent } from './Pages/Brand/Brand-Error/brand-error.component';
import { CarEditComponent } from './Pages/Catalog/Catalog-Edit/catalog-edit.component';
 
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'home', pathMatch: 'full', component: HomeComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'garage', pathMatch: 'full', component: GarageComponent },
    { path: 'catalog', pathMatch: 'full', component: CatalogComponent },
    { path: 'catalog/edit', pathMatch: 'full', component: CarEditComponent},
    { path: 'catalog/edit/:numberPlate', pathMatch: 'full', component: CarEditComponent},
    { path: 'catalog/:numberPlate', pathMatch: 'full', component: CatalogDetailComponent},
    { path: 'garages', pathMatch: 'full', component: GaragesComponent },
    { path: 'garagecreate', pathMatch : 'full', component: GarageCreateComponent },
    { path: 'brand', pathMatch: 'full', component: BrandComponent },
    { path: 'brand/error', pathMatch: 'full', component: BrandErrorComponent},
    { path: 'brand/edit', pathMatch: 'full', component: BrandEditComponent},
    { path: 'brand/edit/:brandName', pathMatch: 'full', component: BrandEditComponent},
    { path: 'brand/:brandName', pathMatch: 'full', component: BrandDetailComponent},
    { path: 'brands', loadChildren: () => import ('./Pages/Brand/brand.module').then(m => m.BrandModule) },
];
