import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard-to-be-written-table',
  templateUrl: './dashboard-to-be-written-table.component.html',
  styleUrls: ['./dashboard-to-be-written-table.component.scss']
})
export class DashboardToBeWrittenTableComponent implements OnInit {

  toBeWrittenQuotes : any[] = [
    {
      "quoteID": 571873,
      "custnmbr": "EQSITE33 ",
      "custname": "Alorica, Inc. ",
      "quoteOwner": "Andrew Ross ",
      "quoteStatus": "Sent",
      "quoteAmount": 19910,
      "quotedOn": "2021-04-30T08:31:58",
      "dateStatusChanged": "2021-05-11T12:50:51",
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
      "quotedOn": "2021-04-22T00:00:00",
      "dateStatusChanged": "2021-04-27T17:59:24",
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
      "quotedOn": "2021-04-21T14:26:25",
      "dateStatusChanged": "2021-04-21T17:11:49",
      "quoteReason": "UPS Replacement",
      "quotePriority": "Normal",
      "contractType": "T&M ",
      "age": 96
      }
  ];

  quotefilterForm = this.fb.group({
    Department : ['A'],
    AccountManager : ['All'],
    DateRange : ['CY']
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
