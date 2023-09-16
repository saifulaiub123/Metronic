import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardViewComponent } from './dashboard-view.component';
import { RouterModule } from '@angular/router';
import { WidgetsModule, ModalsModule, DashboardFilterModule } from 'src/app/_metronic/partials';
import { ChartsComponent } from 'src/app/modules/widgets-examples/charts/charts.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DashboardSalesComponent } from 'src/app/modules/dashboard/dashboard-sales/dashboard-sales.component';
import { DashboarComponentdModule } from 'src/app/modules/dashboard/dashboard-component.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DashboardViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardViewComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
    DashboarComponentdModule,
    HttpClientModule,
    DashboardFilterModule
  ],
})
export class DashboardViewModule { }
