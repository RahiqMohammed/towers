import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentView = 'table';

  constructor() {}
  towerData: any[] = [];
  ngOnInit(): void {}
  isTableViewVisible = true;
  isChartViewVisible = false;

  toggleView(view: string) {
    if (view === 'table') {
      this.isTableViewVisible = true;
      this.isChartViewVisible = false;
    } else {
      this.isTableViewVisible = false;
      this.isChartViewVisible = true;
    }
    this.currentView = view;
  }
}
