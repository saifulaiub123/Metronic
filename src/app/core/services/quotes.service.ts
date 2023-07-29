import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuoteChartDetails } from 'src/app/_metronic/partials/content/widgets/charts/charts-custom-widget/charts-custom-widget.component';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http : HttpClient) { }

  API : string = 'https://localhost:5001/api';
  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });

  getQuotes(filtersObj : any)
  {
    return this.http.post(`${this.API}/quotes/list`,filtersObj);
  }

  getQuotesDetails(quoteId: string)
  {
    return this.http.get(`https://localhost:44387/quotes/Detail/${quoteId}`,{ headers : this.headers});
  }

  getQuoteActivity(quoteId: string)
  {
    return this.http.get(`${this.API}/quotes/Detail/${quoteId}`,{ headers : this.headers});
  }

  getQuoteAccountManagers(dept: string)
  {
    return this.http.get(`${this.API}/quotes/GetManagers/${dept}`,{ headers : this.headers});
  }

  getQuoteStatus()
  {
    return this.http.get(`${this.API}/quotes/GetStatus`,{ headers : this.headers});
  }

  getQuoteYearChartDetails()
  {
    return this.http.get<QuoteChartDetails[]>(`${this.API}/quotes/GetQuoteChartDetails`,{ headers : this.headers});
  }

}
