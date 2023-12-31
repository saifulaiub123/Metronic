import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
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
  filters : any = {
    department : 'A',
    accountManager : 'A'
  }
  dashboardData : any = [
    {
        "countStatus": 0,
        "status": "SE",
        "quoteAmount": 0,
        "statusDesc": "Sent",
        "sortOrder": 1,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 0,
        "status": "VI",
        "quoteAmount": 0,
        "statusDesc": "Viewed",
        "sortOrder": 2,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 0,
        "status": "ID",
        "quoteAmount": 0,
        "statusDesc": "In Discussion",
        "sortOrder": 3,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 0,
        "status": "AC",
        "quoteAmount": 0,
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
        "countStatus": 0,
        "status": "DR",
        "quoteAmount": 0,
        "statusDesc": "To Be Sent",
        "sortOrder": 6,
        "curMonth": 7,
        "curYear": 2023
    },
    {
        "countStatus": 0,
        "status": "CN",
        "quoteAmount": 0,
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
        "quotes": 0
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
    this.filterSharedService.setHomePage(true);
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

  
  
  //getToBeSentTableData()
  //{
    //this.filterSharedService.setToBeSentTableData(this.filters);
  //}
  loadDashboardData() {
    combineLatest([
      this.dashboardService.getDashboardData(this.filters),
      this.dashboardService.getToBeWrittenData(this.filters),
      this.dashboardService.getWeeklyQuotes(this.filters),
    ]).subscribe(([dashboardData, toBeWritten, weeklyQuotes]) => {
      this.dashboardData = dashboardData;
      this.toBeWritten = toBeWritten;
      this.weeklyQuotes = weeklyQuotes;

      this.filterSharedService.setDashboardData(dashboardData);
      this.filterSharedService.settoBeWrittenData(toBeWritten);
      this.filterSharedService.setWeeklyQuotesData(weeklyQuotes);

      
      //this.getToBeSentTableData();
    });
      }
}
