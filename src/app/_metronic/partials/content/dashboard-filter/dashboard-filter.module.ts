import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    FilterDropdownComponent
  ],

  declarations: [FilterDropdownComponent]
})
export class DashboardFilterModule { }
