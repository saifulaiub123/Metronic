import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuotesService } from 'src/app/core/services/quotes.service';
import { QuoteChartDetails } from 'src/app/_metronic/partials/content/widgets/charts/charts-custom-widget/charts-custom-widget.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuoteDetailsModalComponent } from '../modal/quote-details/quote-details.component';
import { ChangeStatusModalComponent } from '../modal/change-status-modal/change-status-modal.component';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, pairwise, startWith } from 'rxjs/operators'
import { QuoteSharedService } from '../quote-shared.service';
import { DashboardFilterSharedService } from 'src/app/core/services/shared-service/dashboard-filter-shared.service';
import { AuthService } from '../../auth';
import { QuoteFileListComponent } from '../modal/quote-file-list/quote-file-list.component';

interface Quote {
  [key:string]: string;
  quoteID: string;
  custName : string;
  contactName : string;
  status : string;
  notes : string;
  quotePriority : string;
  quoteOwner : string;
  quoteOn : string;
  quoteAmount : string;
  // ... Add other properties ...
}

@Component({
  selector: 'app-quotes-list',
  templateUrl: './quotes-list.component.html',
  styles: [
  ]
})
export class QuotesListComponent implements OnInit {

  quotesList : Quote[] = [] ;
  accountManagers : any = [];
  quoteOwner: any;
  quoteStatus : any = [];
  chartData : QuoteChartDetails[];
  fiscalYears : Array<number> = [];
  selectedQuotes: string[] = [];
  selectedSiteIds: string[] = [];
  fromEditPage: boolean = false;
  quotefilterForm = this.fb.group({
    Department : ['A'],
    AccountManager : ['A'],
    QuoteStatus : ['A'],
    Year : [new Date().getFullYear()],
    Month : ['0'],
    Statustype : ['0'],
    QuoteID: null,
    InitialLoad : false
  });
  paginationObj  : any = null;//= {pageNumber : 1 ,pageSize : 10, totalRecordsCount : 680 };
  empLevel: number = 0;
  empName: string = '';

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

  sortedColumn: string = '';
  sortDirection: number = 1;

  sortTable(column: string): void {
    if (this.sortedColumn === column) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
    }

    this.quotesList.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      console.log(aValue[0]);


      if (aValue < bValue) {
        //console.log("b greater");
        return -1 * this.sortDirection;
      } else if (aValue > bValue) {
        //console.log("a greater");
        return 1 * this.sortDirection;
      } else {
        return 0;
      }

  // Handle other cases here, if needed

    });
  }

  sortIcon(column: string): string {
    if (this.sortedColumn === column) {
      return this.sortDirection === 1 ? 'fa-sort-up' : 'fa-sort-down';
    }
    return 'fa-sort';
  }

  selectAllRows(event: any): void {
    if (event.target.checked) {
      // Select all quotes
      this.selectedQuotes = this.quotesList.map(quote => quote.quoteID);
      this.selectedSiteIds = this.quotesList.map(quote => quote.custNmbr);
    } else {
      // Deselect all quotes
      this.selectedQuotes = [];
      this.selectedSiteIds = [];
    }
  }

  isQuoteSelected(quote: Quote): boolean {
    return this.selectedQuotes.includes(quote.quoteID);
    return this.selectedSiteIds.includes(quote.custNmbr);
  }

  // ... Other component code ...






  constructor(
    private quotesService : QuotesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private quoteSharedService: QuoteSharedService,
    private filterDashboardService: DashboardFilterSharedService,
    private auth: AuthService
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
    this.auth.currentUserSubject.subscribe(data=>
    {
      this.empName = data.empName;
      this.empLevel = data.empLevel;
    });
    this.route.queryParamMap.subscribe((params) => {
      if(params.has('status'))
      {
        this.quotefilterForm.controls['QuoteStatus'].setValue(params.get('status'));
      }
      if(params.has('quoteOwner'))
      {
        this.quoteOwner = params.get('quoteOwner');
        this.quotefilterForm.controls['AccountManager'].setValue(params.get('quoteOwner'));
      }
      if(params.has('statusType'))
      {
        this.quotefilterForm.controls['Statustype'].setValue(params.get('statusType'));
      }
    }

  );
    this.filterDashboardService.setHomePage(false);
    this.subscribeSharedServiceData();
    this.LoadQuotes(true);
    this.LoadFilters();
    this.LoadFiscalYears();
    this.onFilterChanges();
  }

  subscribeSharedServiceData()
  {
    this.quoteSharedService.setIsFromEdit$.subscribe((isFromEdit : boolean) => {
      if(isFromEdit)
      {
        // let quotesRequestBody = JSON.parse(localStorage.getItem('QuoteListFilter')!)
        // this.quotefilterForm.patchValue(quotesRequestBody);
        this.fromEditPage = true;
      }
     });
  }


  public LoadQuotes(initialLoad: boolean = false)
  {
    var quotesRequestBody;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let previousUrl = 10;
      };
    });
    if(this.fromEditPage)
    {
      quotesRequestBody = JSON.parse(localStorage.getItem('QuoteListFilter')!)
      this.quotefilterForm.patchValue(quotesRequestBody);
      this.quoteSharedService.resetIsFromEdit();
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



    if(quotesRequestBody.QuoteID == ''){
      quotesRequestBody.QuoteID = null;
    }

    if(quotesRequestBody.PageNumber == undefined){
      quotesRequestBody.PageNumber = 1;
    }

    //quotesRequestBody.paginationObj = {PageNumber : 1, PageSize : 10};
    quotesRequestBody['InitialLoad'] = initialLoad;
    let quoteId = this.quotefilterForm.value.QuoteID;
    if(quoteId !== null && quoteId !== ''){
      this.SearchQuotes();
    }
    else{
      this.quotesService.getGrid(quotesRequestBody).subscribe((data: any)  => {
        this.quotesList = data && data.results.length > 0 ? data.results : [];
        this.paginationObj = data.paginationObj;
      })
    }
  }

  public onFilterChanges()
  {
  this.quotefilterForm.controls.QuoteID.enable({onlySelf: true,emitEvent:false});
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
    let quoteId = this.quotefilterForm.value.QuoteID;
    //this.paginationObj.pageNumber = 1
    if(this.paginationObj['PageNumber'] == undefined){
      this.paginationObj['PageNumber'] = 1;
    }
    if(quoteId !== null && quoteId !== '')
    {
      this.quotesService.searchedQuoteGrid(quoteId,this.paginationObj['PageNumber']).subscribe((data: any)=>{
        this.quotesList = data && data.results.length > 0 ? data.results : [];
        this.paginationObj = data.paginationObj;
      })
    }
    else{
      this.LoadQuotes(false);
    }

  }

  public LoadFilters()
  {
    this.quotesService.getQuoteAccountManagers('A').subscribe((data : any)  => {
    this.accountManagers = data;
    const searchIndex = data.find((x: { text: string; }) => x.text.trim() == this.quoteOwner);
    //if(searchIndex === undefined || JSON.parse(localStorage.getItem("userData")!)["empName"] === this.quoteOwner)
    if(searchIndex === undefined)
    {
      console.log(JSON.parse(localStorage.getItem("userData")!)["username"])
      this.quotefilterForm.controls['AccountManager'].setValue('A');
    }
    else{
      console.log(localStorage.getItem("userData"))
      this.quotefilterForm.controls['AccountManager'].setValue(this.quoteOwner);
    }
    this.LoadQuotes();
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
    console.log(this.selectedQuotes)
    console.log(this.selectedSiteIds)
    modalRef.componentInstance.selectedQuoteIds = this.selectedQuotes;

    modalRef.componentInstance.selectedSiteIds = this.selectedSiteIds;
    modalRef.result.then(res=>{
      if(res)
      {
        this.LoadQuotes()
        this.selectedQuotes = [];
        this.selectedSiteIds = [];
      }
    })
  }
  openGetFilesModal(quoteId: any)
  {
    const modalRef = this.modalService.open(QuoteFileListComponent,{ fullscreen : "lg", centered: true});
    modalRef.componentInstance.selectedQuoteId = quoteId;
    modalRef.result.then(res=>{
      if(res)
      {

      }
    })
  }
  rowSelect(quote: any)
  {
    if(this.selectedQuotes.includes(quote.quoteID))
    {
      console.log(quote)
      this.selectedQuotes.splice(this.selectedQuotes.indexOf(quote.quoteID),1);
      this.selectedSiteIds.splice(this.selectedSiteIds.indexOf(quote.custNmbr),1);
      console.log(this.selectedQuotes)
      console.log(this.selectedSiteIds)
    }
    else{
      this.selectedQuotes.push(quote.quoteID);
      this.selectedSiteIds.push(quote.custNmbr);
    }
  }
  importQuotes()
  {
    this.quotesService.importQuotes(this.empName).subscribe(res=> {

    });

  }

  getColorByStatus(status: string): string {
    switch (status) {
      case 'Sent':
        return '#E8A90E';
      case 'Viewed':
        return '#008ed6';
      case 'In Discussion':
        return '#cc00cc';
      case 'Accepted':
        return '#00b300';
      case 'Declined':
        return '#e60000';
      case 'To Be Sent':
          return '#958C02';
      case 'Cancelled':
            return '#730202';

      // Add more cases for other status if needed
      default:
        return 'white'; // Default color when the status doesn't match any case
    }
  }
  getColorByPriority(status: string): string {
    switch (status) {
      case 'Critical':
            return 'red';
      default:
        return 'black';
    }
  }
}
