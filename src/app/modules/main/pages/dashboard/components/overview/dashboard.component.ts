import { Component, OnInit } from '@angular/core';
import { LineController } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { Colors } from 'chart.js';
import { CacheService } from 'src/app/core/cache/cache.service';
import { Router } from '@angular/router';
import { environment as ENV } from 'src/environments/environment';

Chart.register(LineController, Colors);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../../../../../../assets/css/angularMaterial.css']
})
export class DashboardComponent implements OnInit {
  userName: any;
  myChart: any;

  constructor(private cacheService: CacheService, private router: Router  ) {
    const userInfo = this.cacheService.getSession(ENV.USERINFO);
    this.userName = userInfo.firstName;
  }

  ngOnInit(): void {
    this.chart();
  }

  chart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: 'Failed',
          data: [60, 95, 11, 75, 10, 15, 40, 5, 20, 75, 16, 37],
          borderWidth: 1,
          borderColor: '#E9967A',
          backgroundColor: '#990000',
        },
        {
          label: 'Success',
          data: [70, 85, 25, 46, 7, 42, 65, 30, 12, 37, 88, 35],
          borderWidth: 1,
          borderColor: '#32CD32',
          backgroundColor: '#006400',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100
          }
        },
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        }
      }
    });
  }


  resetForm():void {
    console.log('Form reset');
  }
}
