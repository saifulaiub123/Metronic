import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.css']
})
export class DashboardSalesComponent implements OnInit {

  @Input() color: string = '';
  @Input() data: any[] = [];
  @Input() toBeWritten: number = 0;


  salesData : any[] = [];
  totalBalance : number = 0;
  constructor() { }

  ngOnInit() {
    this.loadData();
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
