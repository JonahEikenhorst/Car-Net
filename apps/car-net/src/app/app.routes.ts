import { Route } from '@angular/router';
import { BrandEditComponent } from 'libs/entity-ui/components/src/lib/brand/brand-edit/brand-edit.component';
import { AboutComponent } from './Pages/About/about.component';

export const appRoutes: Route[] = [
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'brand-edit', pathMatch: 'full', component: BrandEditComponent},
];
