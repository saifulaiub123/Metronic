import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-sales',
  templateUrl: './dashboard-sales.component.html',
  styleUrls: ['./dashboard-sales.component.css']
})
export class DashboardSalesComponent implements OnInit {

  @Input() color: string = '';

  constructor() { }

  ngOnInit() {
  }

}
