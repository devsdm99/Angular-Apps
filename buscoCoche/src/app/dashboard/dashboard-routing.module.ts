import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsedCarsComponent } from './pages/used-cars/used-cars.component';
import { NewCarsComponent } from './pages/new-cars/new-cars.component';
import { Km0CarsComponent } from './pages/km-0-cars/km-0-cars.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'used-cars',
        component: UsedCarsComponent
      },
      {
        path: 'new-cars',
        component: NewCarsComponent
      },
      {
        path: 'km-0',
        component: Km0CarsComponent
      }
    ]
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
