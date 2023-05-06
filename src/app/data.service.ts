import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tower } from './interfaces/main';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getTowers(): Observable<Tower[]> {
    return this.http.get<Tower[]>(
      'https://byanat.wiremockapi.cloud/api/v2/towers'
    );
  }
}
