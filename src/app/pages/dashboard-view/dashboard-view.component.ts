import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { DashboardFilterSharedService } from 'src/app/core/services/shared-service/dashboard-filter-shared.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit{

  subscriptionDashboardFilter$: Subscription;

  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor(private filterSharedService: DashboardFilterSharedService) {}
  ngOnInit(): void {
    this.subscribeSharedServiceData();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  subscribeSharedServiceData()
  {
    this.subscriptionDashboardFilter$ = this.filterSharedService.selectedDashboardFilter$.subscribe((filters : any) => {
      // if(!_.isEmpty(filters))
      // {

      //   bookings.forEach(item => {
      //     let matchedData = _.where(this.selectedBookingsList, {id : item.id});
      //     if(matchedData.length == 0)
      //     {
      //       this.selectedBookingsList.push(item);
      //     }
      //   })
      //   this.sourceBookingItem.load(this.selectedBookingsList).then((data) => {
      //     this.syncTable();
      //   });
      //   this.bookingSharedService.resetBookings();
      // }

      this.filterSharedService.resetDashboardFilters();
     });
  }
}
