import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSalesComponent } from './dashboard-sales/dashboard-sales.component';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports:[
    DashboardSalesComponent
  ],
  declarations: [DashboardSalesComponent]
})
export class DashboarComponentdModule { }
