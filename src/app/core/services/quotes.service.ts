import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuoteChartDetails } from 'src/app/_metronic/partials/content/widgets/charts/charts-custom-widget/charts-custom-widget.component';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http : HttpClient) { }

  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });

  getQuotes(filtersObj : any)
  {
    return this.http.post('https://localhost:44387/api/quotes/list',filtersObj);
  }

  getQuotesDetails(quoteId: string)
  {
    return this.http.get(`https://localhost:44387/api/quotes/Detail/${quoteId}`,{ headers : this.headers});
  }

  getQuoteActivity(quoteId: string)
  {
    return this.http.get(`https://localhost:44387/api/quotes/Detail/${quoteId}`,{ headers : this.headers});
  }

  getQuoteAccountManagers(dept: string)
  {
    return this.http.get(`https://localhost:44387/api/quotes/GetManagers/${dept}`,{ headers : this.headers});
  }

  getQuoteStatus()
  {
    return this.http.get(`https://localhost:44387/api/quotes/GetStatus`,{ headers : this.headers});
  }

  getQuoteYearChartDetails()
  {
    return this.http.get<QuoteChartDetails[]>(`https://localhost:44387/api/quotes/GetQuoteChartDetails`,{ headers : this.headers});
  }

}