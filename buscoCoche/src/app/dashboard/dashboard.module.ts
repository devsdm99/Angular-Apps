import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { UsedCarsComponent } from './pages/used-cars/used-cars.component';
import { RouterModule } from '@angular/router';
import { NewCarsComponent } from './pages/new-cars/new-cars.component';
import { Km0CarsComponent } from './pages/km-0-cars/km-0-cars.component';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { MainPageComponent } from './pages/main-page/main-page.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    UsedCarsComponent,
    NewCarsComponent,
    Km0CarsComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
