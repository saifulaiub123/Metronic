import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { DashboardFilterSharedService } from 'src/app/core/services/shared-service/dashboard-filter-shared.service';
import * as _ from 'lodash';
import { DashboardService } from 'src/app/core/services/dashboard.service';
@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit{

  @ViewChild('modal') private modalComponent: ModalComponent;

  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  subscriptionDashboardFilter$: Subscription;
  filters: any;
  dashboardData : any = [
    {
        "countStatus": 6,
        "status": "SE",
        "quoteAmount": 306178.65,
        "statusDesc": "Sent",
        "sortOrder": 1,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 2,
        "status": "VI",
        "quoteAmount": 6997.14,
        "statusDesc": "Viewed",
        "sortOrder": 2,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 15,
        "status": "ID",
        "quoteAmount": 143021.12,
        "statusDesc": "In Discussion",
        "sortOrder": 3,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 2,
        "status": "AC",
        "quoteAmount": 6625,
        "statusDesc": "Accepted",
        "sortOrder": 4,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 0,
        "status": "DE",
        "quoteAmount": 0,
        "statusDesc": "Declined",
        "sortOrder": 5,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 22,
        "status": "DR",
        "quoteAmount": 171438.91,
        "statusDesc": "To Be Sent",
        "sortOrder": 6,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 11,
        "status": "CN",
        "quoteAmount": 49077.87,
        "statusDesc": "Cancelled",
        "sortOrder": 7,
        "curMonth": 7,
        "curYear": 2023
    }
  ]
  toBeWritten : any;

  constructor(private filterSharedService: DashboardFilterSharedService,
              private dashboardService: DashboardService
             ) {}

  ngOnInit(): void {
    this.subscribeSharedServiceData();
    this.loadToBeWrittenData();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  subscribeSharedServiceData()
  {
    this.subscriptionDashboardFilter$ = this.filterSharedService.selectedDashboardFilter$.subscribe((filters : any) => {
      if(!_.isEmpty(filters))
      {
        this.filters = filters;

        this.loadDashboardData();
        this.filterSharedService.resetDashboardFilters();
      }
     });
  }

  loadToBeWrittenData()
  {
    this.dashboardService.getToBeWrittenData(this.filters).subscribe(res => {
      this.toBeWritten = res;
    })

    this.toBeWritten = 15678;//Need to be removed
  }
  loadDashboardData()
  {
    this.dashboardService.getDashboardData(this.filters).subscribe(res => {
      this.dashboardData = res;
    })
  }
}
