import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tower } from '../../interfaces/main';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'tower_id',
    'operator',
    'height',
    'tower_type',
    'latitude',
    'longitude',
    'technology',
  ];
  dataSource: MatTableDataSource<Tower> = new MatTableDataSource<Tower>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getTowers().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onRowClick(row: any) {
    console.log('Row clicked:', row);
    this.router.navigate(['/tower-details', row.tower_id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
