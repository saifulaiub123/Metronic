import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuotesService } from 'src/app/core/services/quotes.service';

@Component({
  selector: 'app-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.scss']
})
export class ChangeStatusModalComponent implements OnInit {
  @Input() selectedQuoteIds: any[];

  quotes: any[];
  selectedStatus: string = 'SE';

  constructor(public activeModal: NgbActiveModal,
    private quoteService: QuotesService) { }

  ngOnInit(): void {

  }
  updateStatus()
  {
    try {
      this.quoteService.updateAppToBeSentStatus(this.selectedQuoteIds.join(',')).subscribe(res=> {
        
      })
      this.activeModal.close(true);
    } catch (error) {
      this.activeModal.close(false);
    }

  }
}
