import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DashboardSalesBarChartComponent } from './dashboard-sales-bar-chart/dashboard-sales-bar-chart.component';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardWeeklyQuotoesComponent } from './dashboard-weekly-quotoes/dashboard-weekly-quotoes.component';

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgApexchartsModule,
    NgbDropdownModule,
  ],
  exports:[
    DashboardSalesComponent,
    DashboardSalesBarChartComponent,
    DashboardWeeklyQuotoesComponent
  ],
  declarations: [
    DashboardSalesComponent,
    DashboardSalesBarChartComponent,
    DashboardWeeklyQuotoesComponent
  ]
})
export class DashboarComponentdModule { }
