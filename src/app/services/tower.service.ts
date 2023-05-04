import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Tower {
  id: string;
  operator: string;
  address: string;
  height: number;
  tower_type: string;
  latitude: number;
  longitude: number;
  technology: string;
}

@Injectable({
  providedIn: 'root',
})
export class TowerService {
  private apiURL = 'https://byanat.wiremockapi.cloud/api/v2/towers';

  constructor(private http: HttpClient) {}

  getTowers(): Observable<Tower[]> {
    return this.http.get<Tower[]>(this.apiURL);
  }
}
