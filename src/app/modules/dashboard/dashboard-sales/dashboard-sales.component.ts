import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { DashboardFilterSharedService } from 'src/app/core/services/shared-service/dashboard-filter-shared.service';
import { AuthService } from '../../auth';
@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.css']
})
export class DashboardSalesComponent implements OnInit {

  @Input() color: string = '';
  @Input() data: any[] = [];
  @Input() toBeWritten: number = 0;

  empLevel: number = 0;
  empName: string = '';
  subscriptionDashboardFilter$: Subscription;
  subscriptionFilter$: Subscription;
  filters : any;
  //showDelayedContent = false;


  salesData : any[] = [];
  totalBalance : number = 0;
  constructor(private filterSharedService: DashboardFilterSharedService,
    private auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUserSubject.subscribe(data=>
    {
      this.empLevel = data.empLevel;
      this.empName = data.empName;
    });
    // this.loadData();s
    this.subscribeSharedServiceData();
    //setTimeout(() => {
    //  this.showDelayedContent = true;
    //}, 1000);
  }

  subscribeSharedServiceData()
  {
    this.subscriptionDashboardFilter$ = this.filterSharedService.selectedDashboardData$.subscribe((data : any) => {
      if(!_.isEmpty(data))
      {
        this.data = data;
        this.loadData();
        this.filterSharedService.resetDashboardData();
      }
     });
     this.subscriptionFilter$ = this.filterSharedService.selectedDashboardFilter$.subscribe((filters : any) => {
      if(!_.isEmpty(filters))
      {
        this.filters = filters;
        this.filterSharedService.resetDashboardFilters();
      }
     });
     this.filterSharedService.selectedtoBeWritten$.subscribe((data : any) => {
      if(data !== -1)
      {
        this.toBeWritten = data;
        this.loadData();
        this.filterSharedService.resettoBeWrittenData()
        ;
      }
     });
     
  }

  loadData()
  {
    this.salesData[0] =
    {
      statusDesc : "To Be Written",
      countStatus: this.toBeWritten,
      quoteAmount: 0
    }

    this.salesData[1] = this.data.find(obj => {
      return obj.statusDesc === 'To Be Sent'
    })

    this.salesData[2] = this.data.find(obj => {
      return obj.statusDesc === 'Sent'
    })


    //Viewed + Discussion
    let viewdData = this.data.find(obj => {
      return obj.statusDesc === 'Viewed'
    })

    let discussionData = this.data.find(obj => {
      return obj.statusDesc === 'In Discussion'
    })

    this.salesData[3] =
    {
      countStatus: viewdData.countStatus + discussionData.countStatus,
      status: viewdData.status,
      quoteAmount: viewdData.quoteAmount + discussionData.quoteAmount,
      statusDesc: "Viewed + Discussion",
      sortOrder: 3,
      curMonth: viewdData.curMonth,
      curYear: viewdData.curMonth
    }


    this.salesData[4] = this.data.find(obj => {
      return obj.statusDesc === 'Accepted'
    })


    //Cancelled + Discussion
    let cancelledData = this.data.find(obj => {
      return obj.statusDesc === 'Cancelled'
    })

    let declinedData = this.data.find(obj => {
      return obj.statusDesc === 'Declined'
    })
    this.salesData[5] =
    {
      countStatus: cancelledData.countStatus + declinedData.countStatus,
      status: cancelledData.status,
      quoteAmount: cancelledData.quoteAmount + declinedData.quoteAmount,
      statusDesc: "Cancelled + Declined",
      sortOrder: 7,
      curMonth: cancelledData.curMonth,
      curYear: cancelledData.curMonth
    }

    this.totalBalance = this.salesData.reduce((accumulator, obj) => {
      return accumulator + obj.quoteAmount;
    }, 0);

  }
}
