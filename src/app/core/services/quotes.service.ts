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
    return this.http.get(`${this.API}/quotes/Detail/${quoteId}`,{ headers : this.headers});
  }

  getGrid(filtersObj : any)
  {
    return this.http.get(`${this.API}/quotes/grid/${filtersObj.AccountManager}/${filtersObj.Department}/${filtersObj.QuoteStatus}/${filtersObj.Year}/${filtersObj.Month}/${filtersObj.Statustype}/${filtersObj.QuoteID}/${filtersObj.PageNumber}`,{ headers : this.headers });
  }

  getQuoteActivity(quoteId: string)
  {
    return this.http.get(`${this.API}/quotes/Detail/${quoteId}`,{ headers : this.headers});
  }
  getQuoteActivityDetails(quoteId: string)
  {
    return this.http.get(`${this.API}/quotes/GetQuoteActivity/${quoteId}`,{ headers : this.headers});
  }

  getQuoteAccountManagers(dept: string)
  {
    return this.http.get(`${this.API}/quotes/GetManagers/${dept}`,{ headers : this.headers});
  }
  GetAppToBeSent(filtersObj:any){
    return this.http.get(`${this.API}/quotes/GetAppToBeSent/${filtersObj.AccountManager}/${filtersObj.QuoteStatus}/${filtersObj.Statustype}`,{ headers : this.headers });
  }
  GetSiteDetails(filtersObj:any){
    return this.http.get(`${this.API}/quotes/GetSiteDetails/${filtersObj.AccountManager}/${filtersObj.Type}`,{ headers : this.headers });
  }


  getQuoteStatus()
  {
    return this.http.get(`${this.API}/quotes/GetStatus`,{ headers : this.headers});
  }

  getQuoteYearChartDetails()
  {
    return this.http.get<QuoteChartDetails[]>(`${this.API}/quotes/GetQuoteChartDetails`,{ headers : this.headers});
  }
  updateQuoteStatus(quotes: string, status: string)
  {
    return this.http.put(`${this.API}/quotes/UpdateStatus/${quotes}/${status}/Admin`,{});
  }
  updateQuote(id: string, quote: any)
  {
    return this.http.put(`${this.API}/quotes/UpdateQuote/${id}/${quote.contactName}/${quote.contactEmail}/${quote.quoteStatus}/${quote.Notes}/${quote.quotePriority}/${quote.quoteOwner}/z/1`,{});
  }

  updateAppToBeSentStatus(quotes: string)
  {
    return this.http.put(`${this.API}/quotes/UpdateToBeSentStatus/${quotes}/Admin`,{});
  }

}

