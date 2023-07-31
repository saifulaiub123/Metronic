import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { QuotesService } from 'src/app/core/services/quotes.service';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details-modal.component.html',
  styleUrls: ['./quote-details.component.scss']
})
export class QuoteDetailsModalComponent implements OnInit {
  @Input() quoteId: any;

  quotes: any[];

  constructor(public activeModal: NgbActiveModal,
    private quoteService: QuotesService) { }

  ngOnInit(): void {
    this.loadQuote()
  }

  loadQuote()
  {
    this.quoteService.getQuoteActivityDetails(this.quoteId).subscribe((res : any) =>{
      this.quotes = res;
    })
  }
}
