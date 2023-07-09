import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
import { DashboardFilterSharedService } from 'src/app/core/services/shared-service/dashboard-filter-shared.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-sales-bar-chart',
  templateUrl: './dashboard-sales-bar-chart.component.html',
  styleUrls: ['./dashboard-sales-bar-chart.component.scss']
})
export class DashboardSalesBarChartComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() chartHeight: string;

  subscriptionDashboardData$: Subscription;
  public chartOptions: any = {};
  constructor(private filterSharedService: DashboardFilterSharedService) {
    this.chartOptions = this.getChartOptions(this.chartHeight);
  }

  ngOnInit(): void {
    this.subscribeSharedServiceData();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes)
  // }

  subscribeSharedServiceData()
  {
    this.subscriptionDashboardData$ = this.filterSharedService.selectedDashboardData$.subscribe((data : any) => {
      if(!_.isEmpty(data))
      {
        this.data = data;
        this.chartOptions = this.getChartOptions(this.chartHeight);
        this.filterSharedService.resetDashboardData();
      }
     });
  }
  getChartOptions(height: string) {
    const labelColor = getCSSVariableValue('--kt-gray-500')
    const borderColor = getCSSVariableValue('--kt-gray-200')
    const baseColor = getCSSVariableValue('--kt-primary')
    const secondaryColor = getCSSVariableValue('--kt-gray-300')
    const categories = this.data.map((element) => element['statusDesc']);
    const amounts = this.data.map((element) => element['quoteAmount']);
    return {
      series: [
        {
          name: 'Amount',
          data: amounts,
        },
      ],
      chart: {
        fontFamily: 'inherit',
        type: 'bar',
        height: height,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          borderRadius: 5,
        },
      },
      legend: {
        show: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: labelColor,
            fontSize: '12px',
          },
        },
      },
      fill: {
        opacity: 1,
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        y: {
          formatter: function (val: number) {
            return '$' + val + ' thousands';
          },
        },
      },
      colors: [baseColor, secondaryColor],
      grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    };
  }
}

