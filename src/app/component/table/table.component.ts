import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'tower_id',
    'operator',
    'address',
    'height',
    'tower_type',
    'latitude',
    'longitude',
    'technology',
  ];
  dataSource: MatTableDataSource<Tower> = new MatTableDataSource<Tower>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Tower[]>('https://byanat.wiremockapi.cloud/api/v2/towers')
      .subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
