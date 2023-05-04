import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environment/environment';

interface Tower {
  tower_id: number;
  name: string;
  latitude: number;
  longitude: number;
  image: string;
  address: string;
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
    const markers: { [towerId: number]: mapboxgl.Marker } = {};

    this.towers.forEach((tower: Tower) => {
      const marker = new mapboxgl.Marker({ color: '#a4ded9' })
        .setLngLat([tower.longitude, tower.latitude])
        .addTo(this.map)
        .setPopup(
          new mapboxgl.Popup({ className: 'match-parent' }).setHTML(
            `<h3>Tower ${tower.tower_id}</h3>
             <div class="match-parent">
               <img src="/assets/tower2.jpeg" style="width:100%;height:100%;">
             </div>
             <p>Address: ${tower.address}</p>`
          )
        );

      bounds.extend(marker.getLngLat());

      marker.getElement()?.setAttribute('title', `Tower ${tower.tower_id}`);
      marker.getElement()?.addEventListener('mouseenter', () => {
        marker.togglePopup();
      });
      marker.getElement()?.addEventListener('mouseleave', () => {
        marker.togglePopup();
      });

      markers[tower.tower_id] = marker;
    });

    this.map.fitBounds(bounds, {
      padding: { top: 100, bottom: 100, left: 300, right: 700 },
    });
  }
}
