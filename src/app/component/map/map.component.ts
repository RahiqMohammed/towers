import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environment/environment';

interface Tower {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v10';
  towers: Tower[] = [];

  constructor() {
    (mapboxgl as any).accessToken = environment.mapboxAccessToken;
  }

  ngOnInit(): void {
    this.initializeMap();
    this.fetchTowers();
  }

  private initializeMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1,
      center: [0, 0],
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  private fetchTowers(): void {
    fetch('https://byanat.wiremockapi.cloud/api/v2/towers')
      .then((response) => response.json())
      .then((data: Tower[]) => {
        this.towers = data;
        this.addMarkersToMap();
      });
  }

  private addMarkersToMap(): void {
    const bounds = new mapboxgl.LngLatBounds();

    this.towers.forEach((tower: Tower) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([tower.longitude, tower.latitude])
        .addTo(this.map);

      bounds.extend(marker.getLngLat());
    });

    this.map.fitBounds(bounds, { padding: 100 });
  }
}
