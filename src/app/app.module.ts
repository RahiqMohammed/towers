import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './component/table/table.component';
import { MapComponent } from './component/map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../environment/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './component/chart/chart.component';
@NgModule({
  declarations: [AppComponent, TableComponent, MapComponent, ChartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    NgChartsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapboxAccessToken,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
