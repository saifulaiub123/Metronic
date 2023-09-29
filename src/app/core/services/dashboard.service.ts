import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToBeWrittenQuotes } from '../model/to-be-written-quotes';
import { ToBeSentQuotes } from '../model/to-be-sent-quotes';
import { RecentActivities } from '../model/recent-activities';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });
  //API : string = 'http://www.testquoteapi.com/api';
  API : string = 'https://localhost:5001/api';

  getDashboardData(filtersObj : any)
  {
    return this.http.get(`${this.API}/quotes/GetQuoteDashboardAllStatus/${filtersObj.dateRange}/${filtersObj.department}/${filtersObj.accountManager}`,{ headers : this.headers });
  }
  getToBeWrittenData(filtersObj : any)
  {
    return this.http.get(`${this.API}/quotes/GetQuoteDashboardToBeWrittenCount/${filtersObj.dateRange}/${filtersObj.department}/${filtersObj.accountManager}`,{ headers : this.headers });
  }
  getWeeklyQuotes(filtersObj : any)
  {
    return this.http.get(`${this.API}/quotes/GetQuoteDashboardWeeklyCount/${filtersObj.department}/${filtersObj.accountManager}`,{ headers : this.headers });
  }
  getAccountManagers(dept: string)
  {
    return this.http.get(`${this.API}/quotes/GetManagers/${dept}`,{ headers : this.headers });
  }
  getToBeWrittenQuotesData(filtersObj : any)
  {
    return this.http.get<ToBeWrittenQuotes[]>(`${this.API}/quotes/GetQuoteDashboardToBeWrittenQuotes/${filtersObj.accountManager}`,{ headers : this.headers });
  }
  getRecentActivitiesData(quoteOwner : string)
  {
    return this.http.get<RecentActivities[]>(`${this.API}/quotes/GetQuoteDashBoardRecentActivityLog/${quoteOwner}`,{ headers : this.headers });
  }

  getToBeSentQuotesData(filtersObj : any)
  {
    return this.http.get<ToBeSentQuotes[]>(`${this.API}/quotes/GetQuoteDashboardToBeSentQuotes/${filtersObj.accountManager}`,{ headers : this.headers });
  }
}
