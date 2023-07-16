import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { DashboardSalesBarChartComponent } from './dashboard-sales-bar-chart/dashboard-sales-bar-chart.component';
import { DropdownMenusModule } from 'src/app/_metronic/partials';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardWeeklyQuotoesComponent } from './dashboard-weekly-quotoes/dashboard-weekly-quotoes.component';
import { DashboardToBeWrittenTableComponent } from './dashboard-to-be-written-table/dashboard-to-be-written-table.component';
import { DashboardToBeSentQuotesTableComponent } from './dashboard-to-be-sent-quotes-table/dashboard-to-be-sent-quotes-table.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule,
    DropdownMenusModule,
    NgApexchartsModule,
    NgbDropdownModule,
    ReactiveFormsModule
  ],
  exports:[
    DashboardSalesComponent,
    DashboardSalesBarChartComponent,
    DashboardWeeklyQuotoesComponent,
    DashboardToBeWrittenTableComponent,
    DashboardToBeSentQuotesTableComponent
  ],
  declarations: [
    DashboardSalesComponent,
    DashboardSalesBarChartComponent,
    DashboardWeeklyQuotoesComponent,
    DashboardToBeWrittenTableComponent,
    DashboardToBeSentQuotesTableComponent,
    DashboardToBeSentQuotesTableComponent
  ]
})
export class DashboarComponentdModule { }
