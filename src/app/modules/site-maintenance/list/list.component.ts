import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuotesService } from 'src/app/core/services/quotes.service';
import { QuoteChartDetails } from 'src/app/_metronic/partials/content/widgets/charts/charts-custom-widget/charts-custom-widget.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { QuoteDetailsModalComponent } from '../modal/quote-details/quote-details.component';
import { ChangeStatusModalComponent } from '../modal/change-status-modal/change-status-modal.component';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, pairwise, startWith } from 'rxjs/operators'
@Component({
  selector: 'app-site-maintenance-list',
  templateUrl: './list.component.html',
  styleUrls: []
})
export class ListComponent implements OnInit {
  quotesList : any = [] ;
  accountManagers : any = [];
  Type : any = [
    {
      statusDesc:"Temporarily Stopped",
      statusCode:"TS"
    },
    {
      statusDesc:"Permanently Stopped",
      statusCode:"PS"
    },
    {
      statusDesc:"Emails Stopped",
      statusCode:"ES"
    },
    {
      statusDesc:"Voice Calls Stopped",
      statusCode:"VS"
    },
    {
      statusDesc:"Open Sites",
      statusCode:"OS"
    },
  ];
  fiscalYears : Array<number> = [];
  selectedQuotes: string[] = [];
  fromEditPage: boolean = false;
  quotefilterForm = this.fb.group({
    AccountManager : ['A'],
    Type : ['A'],
  });
  paginationObj  : any = {};//= {pageNumber : 1 ,pageSize : 10, totalRecordsCount : 680 };


  constructor(
    private quotesService : QuotesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
    ) {

      router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          let browserRefresh = !router.navigated;
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

    this.LoadData();
    this.LoadFilters();
    // this.LoadFiscalYears();
    this.onFilterChanges();
  }

  public LoadData()
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

    this.quotesService.GetSiteDetails(quotesRequestBody).subscribe((data: any)  => {
      this.quotesList = data && data.length > 0 ? data.slice(0,10) : [];
      // this.paginationObj = data.paginationObj;

    })
  }

  public onFilterChanges()
  {
  // this.quotefilterForm.controls.QuoteID.enable({onlySelf: true,emitEvent:false});
    this.quotefilterForm.valueChanges.pipe(startWith(undefined), pairwise())
    .subscribe(valuesArray => {
         this.LoadData()
         this.selectedQuotes = [];

        //  if ((oldVal !== undefined && oldVal['QuoteID'] === newVal?.QuoteID)) {
        //   this.paginationObj['PageNumber'] = 1;
        //   this.LoadData(false);
        //  }
    })


  }

  public LoadFilters()
  {
    this.quotesService.getQuoteAccountManagers('A').subscribe(data  => {
    this.accountManagers = data;
    });

  }

  splitString(str: string): string[] {
    return str.split(';');
  }


  openQuoteDetailsModal(quoteId: any) {


  }
  openChangeStatusModal(){
    const modalRef = this.modalService.open(ChangeStatusModalComponent,{ fullscreen : "lg", centered: true});
    modalRef.componentInstance.quoteId = this.selectedQuotes;
    modalRef.componentInstance.selectedQuoteIds = this.selectedQuotes;
  }

  rowSelect(quote: any)
  {
    if(this.selectedQuotes.includes(quote.custNmbr.trim()))
    {
      this.selectedQuotes.splice(this.selectedQuotes.indexOf(quote.custNmbr.trim()),1);
    }
    else{
      this.selectedQuotes.push(quote.custNmbr.trim());
    }
  }
  changeStatus()
  {

  }

  getColorByStatus(status: string): string {
    switch (status) {
      case 'Email Missing':
        return '#f1416c';
      // Add more cases for other status if needed
      default:
        return 'black'; // Default color when the status doesn't match any case
    }
  }


  getColorByPriority(status: string): string {
    switch (status) {
      case 'Critical':
            return 'light red';
      default:
        return 'white';
    }
  }
}
