import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuotesService } from 'src/app/core/services/quotes.service';
import { QuoteChartDetails } from 'src/app/_metronic/partials/content/widgets/charts/charts-custom-widget/charts-custom-widget.component';

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styles: [
  ]
})
export class QuotesListComponent implements OnInit {

  quotesList : any = [] ;
  accountManagers : any = [];
  quoteStatus : any = [];
  chartData : QuoteChartDetails[];
  fiscalYears : Array<number> = [];
  quotefilterForm = this.fb.group({
    Department : ['%'],
    AccountManager : ['All'],
    QuoteStatus : ['All'],
    Year : [new Date().getFullYear()],
    Month : ['All'],
    Statustype : ['0'],
    InitialLoad : true
  });
  paginationObj  : any ;//= {pageNumber : 1 ,pageSize : 10, totalRecordsCount : 680 };

  months : any[] = [
    {Text : 'January',value:'1' }
    ,{Text : 'February',value:'2' }
    ,{Text : 'March',value:'3' }
    ,{Text : 'April',value:'4' }
    ,{Text : 'May',value:'5' }
    ,{Text : 'June',value:'6' }
    ,{Text : 'July',value:'7' }
    ,{Text : 'August',value:'8' }
    ,{Text : 'September',value:'9' }
    ,{Text : 'October',value:'10'}
    ,{Text : 'November',value:'11'}
    ,{Text : 'December',value:'12'}
    ,{Text : 'All',value:'All'}
  ];

  constructor(private quotesService : QuotesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.LoadQuotes();
    this.LoadFilters();
    this.LoadFiscalYears();
  }
 
  public LoadQuotes()
  {
    var quotesRequestBody = JSON.parse(JSON.stringify(this.quotefilterForm.value));
    if (!this.paginationObj)
    {
      quotesRequestBody.PageNumber = 1;
      quotesRequestBody.PageSize = 10;
    }
    else
    {
      quotesRequestBody.PageNumber = this.paginationObj.pageNumber;
      quotesRequestBody.PageSize = this.paginationObj.pageSize;
    }
 
    //quotesRequestBody.paginationObj = {PageNumber : 1, PageSize : 10};
    this.quotesService.getQuotes(quotesRequestBody).subscribe((data: any)  => {
      this.quotesList = data && data.results.length > 0 ? data.results : [];
      this.paginationObj = data.paginationObj;
     
    })
  }

  public SearchQuotes()
  {
   this.quotefilterForm.patchValue({InitialLoad : false});
   this.LoadQuotes();
  }

  public LoadFilters()
  {
    this.quotesService.getQuoteAccountManagers('A').subscribe(data  => {
    this.accountManagers = data;
     
    });

    this.quotesService.getQuoteStatus().subscribe(data  => {
      this.quoteStatus = data;
    });

    this.quotesService.getQuoteYearChartDetails().subscribe((data)  => {
      this.chartData = data;
    });

  }

  LoadFiscalYears()
  {
    var year = new Date().getFullYear();
    for (let i = -3; i <=1 ; i++)
    {
      this.fiscalYears.push(year + i);
    }
  }

  updatePagination(event: number)
  {
    this.paginationObj.pageNumber = event;
    //console.log(event);
    this.LoadQuotes();
  }

}
