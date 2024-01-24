import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuotesService } from 'src/app/core/services/quotes.service';
import { AuthService } from '../../../auth';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.scss']
})
export class ChangeStatusModalComponent implements OnInit {
  @Input() selectedSiteIds: any[];
  @Input() selectedQuoteIds: any[]

  quotes: any[];
  selectedStatus: string = '';
  status: string = '';
  empName: string = "";
  showErrorMsg: boolean = false;
  showErrorMsg1: boolean = false;
  isValid: boolean = true;
  invalidQuote: string = ''

  constructor(public activeModal: NgbActiveModal,
    private quoteService: QuotesService,
    private auth: AuthService,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.auth.currentUserSubject.subscribe(data=>
      {
        this.empName = data.empName;
      });

  }
  async updateStatus()
  {
    this.showErrorMsg = false;
    this.showErrorMsg1 = false;
    this.status = this.selectedStatus==='SE'?'Sent':'Viewed';
    try {
      if(this.selectedStatus != "" && JSON.parse(localStorage.getItem("userData")!)["empLevel"] === 1){
        //this.showErrorMsg = false;
        console.log(JSON.parse(localStorage.getItem("userData")!)["empLevel"])
        this.quoteService.updateQuoteStatus(this.selectedQuoteIds.join(','),this.selectedStatus,this.empName).subscribe(res=> {
        });
        alert('Status Updated successfully');
        this.activeModal.close(true);
        //this.activeModal.dismiss('Cross click')
        //window.location.reload();
      }
      else if(this.selectedStatus != "" && JSON.parse(localStorage.getItem("userData")!)["empLevel"] === 0){
        await this.validatechange();
        if (!['SE', 'VI'].includes(this.selectedStatus)) {
          this.isValid = true;
        }
        if(this.isValid){
          //this.showErrorMsg = false;
          this.quoteService.updateQuoteStatus(this.selectedQuoteIds.join(','),this.selectedStatus,this.empName).subscribe(res=> {
          });
          alert('Status Updated successfully');
          this.activeModal.close(true);
          //this.activeModal.dismiss('Cross click')
        //window.location.reload();
        }
        else{
          this.showErrorMsg1 = true;
        }
      }
      else{
        this.showErrorMsg = true;
      }
    } catch (error) {
      this.activeModal.close(false);
    }

  }
  async validatechange(){
    const empName = JSON.parse(localStorage.getItem("userData")!)["empName"];
    try {
      // Create an array of promises for each API call
      const promises = this.selectedSiteIds.map((value) =>
        this.dashboardService.validateUpdateQuoteStatus(value, empName).toPromise()
      );
  
      // Use Promise.all to wait for all promises to complete
      const responses = await Promise.all(promises);
  
      // Iterate over responses and update the boolean accordingly
      responses.forEach((response, index) => {
        console.log(response);
        if (response === 0) {
          this.isValid = false;
          this.invalidQuote = this.selectedQuoteIds[index];
        }
      });
    } catch (error) {
      console.error('Error in validatechange:', error);
    }
  }

}
