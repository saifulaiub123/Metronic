import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { ToBeWrittenQuotes } from 'src/app/core/model/to-be-written-quotes';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DashboardFilterSharedService } from 'src/app/core/services/shared-service/dashboard-filter-shared.service';

@Component({
  selector: 'app-dashboard-recent-activities',
  templateUrl: './dashboard-recent-activities.component.html',
  styleUrls: ['./dashboard-recent-activities.component.scss']
})
export class DashboardRecentActivitiesComponent implements OnInit {

  subscriptionToBeWrittenData$: Subscription;
  filter : any = {
    accountManager : 'A'
  }
  accountManagers: any[] = [];
  toBeWrittenQuotes : ToBeWrittenQuotes[] = [
    {
      "quoteID": 571873,
      "custnmbr": "EQSITE33 ",
      "custname": "Alorica, Inc. ",
      "quoteOwner": "Andrew Ross ",
      "quoteStatus": "Sent",
      "quoteAmount": 19910,
      "quotedOn": new Date("2021-04-30T08:31:58"),
      "dateStatusChanged": new Date("2021-05-11T12:50:51"),
      "quoteReason": "Caps and Fans Installation ",
      "quotePriority": "Normal ",
      "contractType": "T&M ",
      "age": 795
      },
      {
      "quoteID": 568668,
      "custnmbr": "KPSCA182 ",
      "custname": "Kaiser Permanente ",
      "quoteOwner": "Robby Dorrance",
      "quoteStatus": "Sent",
      "quoteAmount": 9151.14,
      "quotedOn": new Date("2021-05-01T00:00:00"),
      "dateStatusChanged": new Date("2021-04-27T17:59:24"),
      "quoteReason": "Battery Installation - Full ",
      "quotePriority": "Normal",
      "contractType": "T&M ",
      "age": 97
      },
      {
      "quoteID": 568408,
      "custnmbr": "BASSPRTX09 ",
      "custname": "Bass Pro Shops ",
      "quoteOwner": "Zack Larson ",
      "quoteStatus": "Sent",
      "quoteAmount": 2225.5,
      "quotedOn": new Date("2022-05-21T14:26:25"),
      "dateStatusChanged": new Date("2021-04-21T17:11:49"),
      "quoteReason": "UPS Replacement",
      "quotePriority": "Normal",
      "contractType": "T&M ",
      "age": 96
      }
  ];



  constructor(
    private filterSharedService: DashboardFilterSharedService,
    private dashboardService: DashboardService
    ) {

  }

  ngOnInit(): void {
    this.subscribeSharedServiceData();
  }


  subscribeSharedServiceData()
  {
    this.subscriptionToBeWrittenData$ = this.filterSharedService.selectedToBeWrittenTable$.subscribe((filter : any) => {
      if(!_.isEmpty(filter))
      {
        this.accountManagers = JSON.parse(localStorage.getItem("AccountManagers")!);
        var item = this.accountManagers.find(x => x.value === filter.accountManager);
        this.filter.accountManager = item.text;
        this.loadData();
        this.filterSharedService.resetToBeWrittenTableData();
      }
     });
  }

  loadData()
  {
    this.dashboardService.getToBeWrittenQuotesData(this.filter).subscribe((res) => {
      this.toBeWrittenQuotes.sort((a, b) => {
        let da : any = new Date(a.quotedOn),
            db : any = new Date(b.quotedOn);
        return db - da;
    });
      this.toBeWrittenQuotes = _.take(this.toBeWrittenQuotes,10);

      // this.toBeWrittenQuotes = _.take(_.sortBy(res,['quotedOn'], ['desc']),10);
    })
  }
}

