import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentView = 'table';

  constructor(private router: Router) {}
  towerData: any[] = [];
  ngOnInit(): void {}
  isTableViewVisible = true;
  isChartViewVisible = false;
  onRowClick(row: any) {
    console.log('Row clicked:', row);
    this.router.navigate(['/tower-details', row.tower_id]);
    this.isTableViewVisible = false;
  }
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
