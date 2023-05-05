import { Component } from '@angular/core';
import axios from 'axios';
import * as ApexCharts from 'apexcharts';

interface Tower {
  tower_id: number;
  operator: string;
  address: string;
  height: number;
  tower_type: string;
  latitude: number;
  longitude: number;
  technology: string;
}

interface TechCounts {
  [key: string]: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  async ngOnInit() {
    const { data } = await axios.get<Tower[]>(
      'https://byanat.wiremockapi.cloud/api/v2/towers'
    );

    const techCounts: TechCounts = {};
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
  }
}
