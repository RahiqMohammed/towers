import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Tower } from '../../interfaces/main';
import { DataService } from '../../data.service';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  towers: Tower[] = [];
  map!: mapboxgl.Map;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getTowers().subscribe((data) => {
      this.towers = data;
      this.initializeMap();
    });
  }

  initializeMap() {
    (mapboxgl as any).accessToken = environment.mapboxAccessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [0, 0],
      zoom: 2,
    });

    this.map.on('load', () => {
      this.addMarkers();
    });
  }

  addMarkers() {
    const markers = [];
    const bounds = new mapboxgl.LngLatBounds();
    for (const tower of this.towers) {
      let color = '';
      switch (tower.technology) {
        case '2G':
          color = '#2F4F4F';
          break;
        case '3G':
          color = '#008B8B';
          break;
        case '4G':
          color = '#b3b3b3';
          break;
        case '5G':
          color = '#a4ded9';
          break;
      }
      const popup = new mapboxgl.Popup({
        className: 'popup-container',
        closeButton: true,
        closeOnClick: true,
      }).setHTML(
        `<div class="popup-content">
             <h3>Tower ${tower.tower_id}</h3>
             <img src="/assets/tower2.jpeg" style="width:100%;height:100%;">
             <p>Address: ${tower.address}</p>
           </div>`
      );

      const marker = new mapboxgl.Marker({ color })
        .setPopup(popup)
        .setLngLat([tower.longitude, tower.latitude])
        .addTo(this.map);
      marker.getElement()?.setAttribute('title', `Tower ${tower.tower_id}`);
      marker.getElement()?.addEventListener('mouseenter', () => {
        marker.getElement()?.classList.add('tooltip-visible');
      });
      marker.getElement()?.addEventListener('mouseleave', () => {
        marker.getElement()?.classList.remove('tooltip-visible');
      });

      bounds.extend(marker.getLngLat());
      markers.push(marker);
    }
    this.map.fitBounds(bounds, {
      padding: 100,
    });
  }
}
