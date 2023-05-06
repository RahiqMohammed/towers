import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { TechCounts, Tower } from '../../interfaces/main';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  constructor(private dataService: DataService) {}
  ngOnInit() {
    const techCounts: TechCounts = {};
    this.dataService.getTowers().subscribe((data: Tower[]) => {
      data.forEach((tower) => {
        if (!techCounts[tower.technology]) {
          techCounts[tower.technology] = 1;
        } else {
          techCounts[tower.technology]++;
        }
      });

      const chartOptions: ApexCharts.ApexOptions = {
        chart: {
          type: 'donut',
        },
        series: Object.values(techCounts),
        labels: Object.keys(techCounts),
        colors: ['#a4ded9', '#008B8B', '#b3b3b3', '#2F4F4F'],
      };

      const chart = new ApexCharts(
        document.querySelector('#chart'),
        chartOptions
      );
      chart.render();
    });
  }
}
