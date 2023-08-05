import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuotesService } from 'src/app/core/services/quotes.service';
import { QuoteChartDetails } from 'src/app/_metronic/partials/content/widgets/charts/charts-custom-widget/charts-custom-widget.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuoteDetailsModalComponent } from '../modal/quote-details/quote-details.component';
import { ChangeStatusModalComponent } from '../modal/change-status-modal/change-status-modal.component';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, pairwise, startWith } from 'rxjs/operators'
import { Subscription } from 'rxjs';
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
  selectedQuotes: string[] = [];
  fromEditPage: boolean = false;
  quotefilterForm = this.fb.group({
    Department : ['A'],
    AccountManager : ['A'],
    QuoteStatus : ['A'],
    Year : [new Date().getFullYear()],
    Month : ['0'],
    Statustype : ['0'],
    QuoteID: [null],
    InitialLoad : true
  });
  paginationObj  : any = {};//= {pageNumber : 1 ,pageSize : 10, totalRecordsCount : 680 };

  months : any[] = [
     {Text : 'All',value:'0'}
    ,{Text : 'January',value:'1' }
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
  ];

  subscription: Subscription;
  browserRefresh: boolean = false;
  constructor(
    private quotesService : QuotesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
    ) {

      router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.browserRefresh = !router.navigated;
        }
      });
    }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let pageReloading = !this.router.navigated;
        console.log(pageReloading)
      }
  });
    this.route.queryParamMap.subscribe((params) => {
      if(params.has('isCancel'))
      {
        if(params.get('isCancel') === 'true')
        {
          this.fromEditPage = true;
        }
      }
    }
  );

    this.LoadQuotes(true);
    this.LoadFilters();
    this.LoadFiscalYears();
    this.onFilterChanges();
  }

  public LoadQuotes(initialLoad: boolean = false)
  {
    var quotesRequestBody;
    if(this.fromEditPage)
    {
      quotesRequestBody = JSON.parse(localStorage.getItem('QuoteListFilter')!)
      this.quotefilterForm.patchValue(quotesRequestBody);
    }
    else
    {
      quotesRequestBody = JSON.parse(JSON.stringify(this.quotefilterForm.value));
    }

    localStorage.setItem('QuoteListFilter',JSON.stringify(quotesRequestBody))
    // var quotesRequestBody = JSON.parse(JSON.stringify(this.quotefilterForm.value));
    if (!this.paginationObj)
    {
      quotesRequestBody['PageNumber'] = 1;
      quotesRequestBody['PageSize'] = 10;
    }
    else
    {
      quotesRequestBody.PageNumber = this.paginationObj['PageNumber'];
      quotesRequestBody.PageSize = this.paginationObj['PageSize'];
    }

    //quotesRequestBody.paginationObj = {PageNumber : 1, PageSize : 10};
    quotesRequestBody['InitialLoad'] = initialLoad;
    this.quotesService.getQuotes(quotesRequestBody).subscribe((data: any)  => {
      this.quotesList = data && data.results.length > 0 ? data.results : [];
      this.paginationObj = data.paginationObj;

    })
  }

  public onFilterChanges()
  {
    this.quotefilterForm.valueChanges.pipe(startWith(undefined), pairwise())
    .subscribe(valuesArray => {
         const oldVal = valuesArray[0];
         const newVal = valuesArray[1];

         const oldQuoteId = oldVal === undefined ? null : oldVal['QuoteID'];
         if(oldQuoteId === newVal?.QuoteID)
         {
          this.paginationObj['PageNumber'] = 1;
          this.LoadQuotes(false);
         }
    })
  }
  public SearchQuotes()
  {
   this.LoadQuotes(false);
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
    this.paginationObj['PageNumber'] = event;
    //console.log(event);
    this.LoadQuotes(false);
  }

  openQuoteDetailsModal(quoteId: any) {
    const modalRef = this.modalService.open(QuoteDetailsModalComponent,{ fullscreen : "lg", centered: true});
    modalRef.componentInstance.quoteId = quoteId;


  }
  openChangeStatusModal(){
    const modalRef = this.modalService.open(ChangeStatusModalComponent,{ fullscreen : "lg", centered: true});
    modalRef.componentInstance.quoteId = this.selectedQuotes;
    modalRef.componentInstance.selectedQuoteIds = this.selectedQuotes;

    modalRef.result.then(result=> {
      if(result)
      {
        this.LoadQuotes(false);
      }
    })
  }

  rowSelect(quote: any)
  {
    if(this.selectedQuotes.includes(quote.quoteID))
    {
      this.selectedQuotes.splice(this.selectedQuotes.indexOf(quote.quoteID),1);
    }
    else{
      this.selectedQuotes.push(quote.quoteID);
    }
  }
  changeStatus()
  {

  }
}
