import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });
  API : string = 'https://localhost:44387/api';

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
    // return this.http.get(`${this.API}/quotes/GetQuoteDashboardWeeklyCount/ALL/'Alyssa Larson'`,{ headers : this.headers });
    return this.http.get(`${this.API}/quotes/GetQuoteDashboardWeeklyCount/${filtersObj.department}/${filtersObj.accountManager}`,{ headers : this.headers });
  }
  getAccountManagers(dept: string)
  {
    return this.http.get(`${this.API}/quotes/GetManagers/${dept}`,{ headers : this.headers });
  }
}
