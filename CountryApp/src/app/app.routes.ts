import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';

export const routes: Routes = [
    /*{
        path: '',
        component: HomePageComponent,
    },*/
    {
        path: 'about',
        component: AboutPageComponent
    },
    {
        path: 'countries',
        loadChildren: () => import('./countries/countries-routes').then(feature => feature.countryRoutes)
    },
    {
        path: '**',
        redirectTo: 'countries',
    }
    
];
