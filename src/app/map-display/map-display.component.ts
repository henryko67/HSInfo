import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements AfterViewInit {

  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [44.967243, -103.771556],
      zoom: 4.5,
      maxZoom: 15,
      minZoom: 3
    });

    const tiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
  //const response = await fetch("../../data/private_school.geojson");
    private markers: any = L.markerClusterGroup();
    schools: any = [];
    async getData(): Promise<void> {
      const response = await fetch("https://henryko67.github.io/data/Private_School_Data.json");
      const data = await response.json();
      this.addData(JSON.parse(data));
    }

    private addData(data: any) {
      for (let element of data) {
        let title = element.Private_School_Name;
        this.schools.push(title);
        let marker = L.marker(new L.LatLng(element.Latitude, element.Longitude), {title: title});
        marker.bindPopup(title);
        this.markers.addLayer(marker);
      }
      this.map.addLayer(this.markers);
    }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
    this.getData();
    this.map.invalidateSize(true);
  }

}
