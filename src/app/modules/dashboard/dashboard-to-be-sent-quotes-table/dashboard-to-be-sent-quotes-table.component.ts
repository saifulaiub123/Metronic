import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-to-be-sent-quotes-table',
  templateUrl: './dashboard-to-be-sent-quotes-table.component.html',
  styleUrls: ['./dashboard-to-be-sent-quotes-table.component.scss']
})
export class DashboardToBeSentQuotesTableComponent implements OnInit {

  toBeSentQuotes : any[] = [
    {
      "quoteID": 566886,
      "custnmbr": "CHMPCA01 ",
      "custname": "Community Hospital Monterey Peninsula ",
      "quoteOwner": "Evan Cis",
      "quoteStatus": "In Discussion",
      "quoteAmount": 5139.68,
      "quotedOn": "2021-04-19T11:36:33",
      "dateStatusChanged": "2021-04-19T14:53:33",
      "quoteReason": "Battery Installation - Full ",
      "quotePriority": "Critical",
      "contractType": "T&M ",
      "age": 817
      },
      {
      "quoteID": 566887,
      "custnmbr": "CHMPCA01 ",
      "custname": "Community Hospital Monterey Peninsula ",
      "quoteOwner": "Evan Cis",
      "quoteStatus": "In Discussion",
      "quoteAmount": 5139.68,
      "quotedOn": "2021-04-19T11:39:47",
      "dateStatusChanged": "2021-04-19T14:54:04",
      "quoteReason": "Battery Installation - Full ",
      "quotePriority": "Critical",
      "contractType": "T&M ",
      "age": 817
      },
      {
        "quoteID": 567027,
        "custnmbr": "OSFIL03",
        "custname": "Ottawa Regional Hospital & Healthcare Center",
        "quoteOwner": "Alaina Price",
        "quoteStatus": "Sent",
        "quoteAmount": 8727.5,
        "quotedOn": "2021-04-20T14:35:14",
        "dateStatusChanged": "2021-04-22T17:41:12",
        "quoteReason": "Caps and Fan Installation",
        "quotePriority": "Critical",
        "contractType": "T&M ",
        "age": 816
        }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
