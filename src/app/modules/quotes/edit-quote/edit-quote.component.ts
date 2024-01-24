import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuotesService } from 'src/app/core/services/quotes.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { QuoteSharedService } from '../quote-shared.service';
import { AuthService } from '../../auth';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styles: [
  ]
})
export class EditQuoteComponent implements OnInit {

  quoteId : string = "";
  accountManagers: any;
  custNmbr : string = "";
  status : string = "";
  isValid: boolean = true;
  showErrorMsg: boolean = false;
  showErrorMsg1: boolean = false;

  empName: string = "";

  quoteForm = this.fb.group({
    customerNumber : [{value: '', disabled: true}],
    customerName : [{value: '', disabled: true}],
    quoteReason: [{value: '', disabled: true}],
    quoteAmount : [''],
    quoteDate : new FormControl({ value: '', disabled: true }),
    quoteCreatedDate: new FormControl({ value: '', disabled: true }),
    quoteExpiryDate: new FormControl({ value: '', disabled: true }),
    contactName : [''],
    contactEmail : [''],
    purchaseReq : 0,
    Notes : [''],
    quoteOwner : [''],
    quoteStatus : [''],
    quotePriority : ['']
  });
  constructor( private route : ActivatedRoute,
    private quoteService : QuotesService,
    private fb: FormBuilder,
    private router: Router,
    private quoteSharedService: QuoteSharedService,
    private auth: AuthService,
    private dashboardService: DashboardService,
    private location: Location
    ) {
    this.route.params.subscribe(param => {
      if(param['quoteId'] != null)
      {
        this.quoteId = param['quoteId'];
      }
    });
  }


  ngOnInit(): void {
    this.getQuoteDetail();
    this.getManagers();
    this.auth.currentUserSubject.subscribe(data=>
      {
        this.empName = data.empName;
      });
  }
  updatePurchaseReq(checked: boolean): void {
    this.quoteForm.patchValue({
      purchaseReq: checked ? 1 : 0
    });
  }
  

  getManagers()
  {
    this.quoteService.getQuoteAccountManagers('A').subscribe(res  => {
      this.accountManagers = res;
    });
  }
  getQuoteDetail()
  {
    this.quoteService.getQuotesDetails(this.quoteId).subscribe((data : any) => {
      //this.quoteDetail = data;
      if (data)
      {
        const formattedQuoteAmount = parseFloat(data.quoteAmount).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD' // Change the currency code as needed
        });
        this.custNmbr = data.custNmbr
        this.quoteForm.setValue({
          customerNumber : data.custNmbr,
          customerName : data.custName,
          quoteReason: data.problemCode,
          quoteAmount : formattedQuoteAmount,
          quoteDate : new Date(data.quotedOn).toDateString(),
          quoteCreatedDate : new Date(data.createdOn).toDateString(),
          quoteExpiryDate: new Date(data.quoteExpDate).toDateString(),
          contactName : data.contactName,
          contactEmail : data.contactEmail,
          purchaseReq: data.purchaseReq ? 1 : 0,
          Notes : data.notes.trim(),
          quoteOwner : data.quoteOwner.trim(),
          quoteStatus : data.status,
          quotePriority : data.quotePriority.trim()
        });
        this.quoteForm.get('quoteAmount')?.disable();
      }

    })
  }
  cancel()
  {
    this.quoteSharedService.setIsFromEdit(true);
    this.router.navigate(['quotes/list']);
  }
  async update()
  {
    this.showErrorMsg1 = false;
    let quote = this.quoteForm.value;
    if (quote.contactEmail === ""){
      quote.contactEmail = " "
    }
    if (quote.contactName === ""){
      quote.contactName = " "
    }
    if (quote.Notes === ""){
      quote.Notes = " "
    }
    if(JSON.parse(localStorage.getItem("userData")!)["empLevel"] === 1){
      this.quoteService.updateQuote(this.quoteId,quote,this.empName).subscribe(res=> {
      })
      alert('Quote Updated successfully');
      this.router.navigate(['quotes/list']);
      
    }
    else{
      await(this.validatechange());
      const isAnyFieldEmpty = Object.values(this.quoteForm.value).some(value => value === '' || value === null);

      if (isAnyFieldEmpty) {
        this.showErrorMsg1 = true;
        return;
      }
      if(this.isValid){
        this.quoteService.updateQuote(this.quoteId,quote,this.empName).subscribe(res=> {
        })
        alert('Quote Updated successfully');
        this.router.navigate(['quotes/list']);
        
      }
      else{
        this.showErrorMsg = true;
        this.isValid = true;
      }
    }
  }

  async validatechange(){
    try {
      let quote = this.quoteForm.value;
      if (quote.quoteStatus === 'SE' || quote.quoteStatus === 'VI') {
        this.status = quote.quoteStatus==='SE'?'Sent':'Viewed';
        if(this.custNmbr){
          const response = await this.dashboardService.validateUpdateQuoteStatus(this.custNmbr, this.empName).toPromise();
          if (response === 0) {
              this.isValid = false;
          }
        }
      }
  } catch (error) {
      console.error('Error in validatechange:', error);
  }
  }

}
