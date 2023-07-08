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

  getDashboardData(filtersObj : any)
  {
    return this.http.post('https://localhost:44387/api/quotes/GetQuoteDashboardAllStatus/CY/ALL/1',filtersObj);
  }

  getAccountManagers(dept: string)
  {
    return this.http.get(`https://localhost:44387/api/quotes/GetManagers/${dept}`,{ headers : this.headers});
  }
}
