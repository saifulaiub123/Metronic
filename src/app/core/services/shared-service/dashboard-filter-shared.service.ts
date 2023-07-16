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

  private toBeWritten$ = new BehaviorSubject<number>(0);
  selectedtoBeWritten$ = this.toBeWritten$.asObservable();
  settoBeWrittenData(data: any) {
    this.toBeWritten$.next(data);
  }
  resettoBeWrittenData()
  {
    this.toBeWritten$.next(0);
  }

  
  private dashboardData$ = new BehaviorSubject<any>([]);
  selectedDashboardData$ = this.dashboardData$.asObservable();

  setDashboardData(data: any) {
    this.dashboardData$.next(data);
  }
  resetDashboardData()
  {
    this.dashboardData$.next([]);
  }

  private weeklyQuotes$ = new BehaviorSubject<any>([]);
  selectedWeeklyQuotes$ = this.weeklyQuotes$.asObservable();

  setWeeklyQuotesData(data: any) {
    this.weeklyQuotes$.next(data);
  }
  resetWeeklyQuotesData()
  {
    this.weeklyQuotes$.next([]);
  }

}
