import { Injectable } from '@angular/core';
import { Map, NavigationControl } from 'mapbox-gl';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  public createMap(options: any): Observable<Map> {
    return new Observable((observer: Observer<Map>) => {
      const map = new Map({
        ...options,
        zoomControl: false,
      });

      const nav = new NavigationControl();
      map.addControl(nav, 'top-right');

      map.on('load', () => {
        observer.next(map);
        observer.complete();
      });
    });
  }
}
