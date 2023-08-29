import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  changeStatusForm = this.fb.group({
    Type : [0],
    RemindType : ['V'],
    StopDaysCount : [-1]
  });

  constructor(public activeModal: NgbActiveModal,
    private quoteService: QuotesService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {

  }
  updateStatus()
  {
    try {
      // Type and stopdays should be int
      let data = this.changeStatusForm.value;
      if(data.StopDaysCount as number < 365)
      {
        data.Type = 1;
      }
      this.quoteService.updateStopQuoteReminders(this.selectedQuoteIds.join(','),data).subscribe(res=> {

      })
      this.activeModal.close(true);
    } catch (error) {
      this.activeModal.close(false);
    }

  }
}
