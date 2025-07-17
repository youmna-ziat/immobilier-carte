import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class MapComponent implements OnInit {
  map!: L.Map;

  ngOnInit(): void {
    this.map = L.map('map',{
      maxBounds: L.latLngBounds(
        [27.5, -13.0],
        [35.92, -0.9]
      ),
      maxBoundsViscosity: 1.0
    }).setView([31.7917, -7.0926], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([33.56660, -7.63581]).addTo(this.map)
      .bindPopup('INVOLYS')
      .openPopup();
  }
}
