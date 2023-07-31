import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuotesService } from 'src/app/core/services/quotes.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styles: [
  ]
})
export class EditQuoteComponent implements OnInit {

  quoteId : string = "";
  accountManagers: any;

  quoteForm = this.fb.group({
    customerNumber : [{value: '', disabled: true}],
    customerName : [{value: '', disabled: true}],
    quoteReason: [{value: '', disabled: true}],
    quoteAmount : [{value: '', disabled: true}],
    quoteDate : [''],
    quoteExpiryDate: [''],
    contactName : [''],
    contactEmail : [''],
    purchaseReq : [false],
    Notes : [''],
    quoteOwner : [''],
    quoteStatus : [''],
    quotePriority : ['']
  });
  constructor( private route : ActivatedRoute, private quoteService : QuotesService, private fb: FormBuilder) {
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
        this.quoteForm.setValue({
          customerNumber : data.custNmbr,
          customerName : data.custName,
          quoteReason: data.problemCode,
          quoteAmount : data.quoteAmount,
          quoteDate : new Date(data.quotedOn).toDateString(),
          quoteExpiryDate: new Date(data.quotedOn).toDateString(),
          contactName : data.contactName,
          contactEmail : data.contactEmail,
          purchaseReq : false,
          Notes : data.notes,
          quoteOwner : data.quoteOwner,
          quoteStatus : data.status,
          quotePriority : data.quotePriority.trim()
        });
      }

    })
  }

}
