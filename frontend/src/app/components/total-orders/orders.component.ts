import { Component, OnInit, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { MatButtonModule } from '@angular/material/button';

import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexYAxis,
  ApexGrid,
  ApexPlotOptions,
  ApexFill,
  ApexMarkers,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';

export interface ordersChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

@Component({
  selector: 'app-traffic-distribution',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, MatButtonModule, NgApexchartsModule],
  templateUrl: './orders.component.html',
})
export class AppOrdersComponent implements OnInit{

  @ViewChild('chart') chart: ChartComponent = Object.create(null);

  public ordersChart!: Partial<ordersChart> | any;
  totalOrders: number = 0;
  orders: any[] = [];
  user: any;

  ngOnInit(): void {
    this.user = this.authService.getUserDetailsFromLocalStorage();
    this.loadUserOrders();

  }

  constructor(private authService:AuthService, private orderService:OrderService, private toastr:ToastrService) {

    this.ordersChart = {
      series: [5368, 3500, 4106],
      labels: ['5368', 'Cancelled', 'Delivered'],
      chart: {
        type: 'donut',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 160,
      },
      colors: ['#e7ecf0', '#fb977d', '#0085db'],
      plotOptions: {
        pie: {
          donut: {
            size: '80%',
            background: 'none',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '12px',
                color: undefined,
                offsetY: 5,
              },
              value: {
                show: false,
                color: '#98aab4',
              },
            },
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 120,
            },
          },
        },
      ],
      tooltip: {
        enabled: false,
      },
    };

  }

  loadUserOrders(): void {
    const loggedInUser = this.authService.getUserDetailsFromLocalStorage();
    if (loggedInUser && loggedInUser.id) {
      this.orderService.getUserOrders(loggedInUser.id).subscribe(
        (response) => {
          this.orders = response;
          this.totalOrders = this.orders.length; // Calculate total orders
        },
        (error) => {
          this.toastr.error('Failed to load orders');
        }
      );
    }
}
}
