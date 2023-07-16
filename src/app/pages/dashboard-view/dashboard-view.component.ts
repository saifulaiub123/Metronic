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

  weeklyQuotes : any =
  [
    {
        "date": "2023-05-21T00:00:00",
        "quotes": 0
    },
    {
        "date": "2023-05-28T00:00:00",
        "quotes": 0
    },
    {
        "date": "2023-06-04T00:00:00",
        "quotes": 0
    },
    {
        "date": "2023-06-11T00:00:00",
        "quotes": 0
    },
    {
        "date": "2023-06-18T00:00:00",
        "quotes": 0
    },
    {
        "date": "2023-06-25T00:00:00",
        "quotes": 19
    },
    {
        "date": "2023-07-02T00:00:00",
        "quotes": 0
    }
]


  constructor(private filterSharedService: DashboardFilterSharedService,
              private dashboardService: DashboardService
             ) {}

  ngOnInit(): void {
    this.subscribeSharedServiceData();
    this.getToBeWrittenData();
    this.getWeeklyQuotes();

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

  getToBeWrittenData()
  {
    this.dashboardService.getToBeWrittenData(this.filters).subscribe(res => {
      this.toBeWritten = res;
      this.filterSharedService.settoBeWrittenData(res);
    })
    // this.toBeWritten = 15678;//Need to be removed
  }
  getWeeklyQuotes()
  {
    this.dashboardService.getWeeklyQuotes(this.filters).subscribe(res => {
      this.weeklyQuotes = res
      this.filterSharedService.setWeeklyQuotesData(this.weeklyQuotes);
    })
    // this.filterSharedService.setWeeklyQuotesData(this.weeklyQuotes);//Need to be removed
  }
  getSalesSummaryData()
  {
    this.dashboardService.getDashboardData(this.filters).subscribe(res => {
      this.dashboardData = res;
      this.filterSharedService.setDashboardData(this.dashboardData);
    })
  }
  loadDashboardData()
  {
    this.getSalesSummaryData();
    this.getToBeWrittenData();
    this.getWeeklyQuotes();
    // this.dashboardService.getWeeklyQuotes(this.filters).subscribe(res => {
    //   this.dashboardData = res;
    //   this.filterSharedService.setDashboardData(this.dashboardData);
    // })
    // this.filterSharedService.setDashboardData(this.dashboardData);//should be removed
  }
}
