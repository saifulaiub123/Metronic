import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardFilterSharedService {

  private dashboardFilter$ = new BehaviorSubject<any>({});
  selectedDashboardFilter$ = this.dashboardFilter$.asObservable();

  setDashboardFilter(filters: any) {
    this.dashboardFilter$.next(filters);
  }
  resetDashboardFilters()
  {
    this.dashboardFilter$.next({});
  }

}
