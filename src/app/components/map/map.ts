import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import { Icon, Marker } from 'leaflet';
import { Sidebar } from '../../sidebar/sidebar';
import { BienImmobilier, Biens } from '../../services/biens';
import 'leaflet/dist/images/marker-shadow.png';

@Component({
  selector: 'app-map',
  standalone: true, 
  imports: [CommonModule, Sidebar], 
  templateUrl: './map.html', 
  styleUrls: ['./map.css'], 
  providers: [Biens]
})
export class MapComponent implements OnInit {
  private biensService = inject(Biens);
  selectedProperty = signal<BienImmobilier | null>(null);
  sidebarVisible = signal(false);

  // Référence à la carte Leaflet
  map!: L.Map;

  ngOnInit(): void {
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconUrl: 'images/pin.png', 
      iconRetinaUrl: 'images/pin.png', 
      shadowUrl: '' 
    });

  
    this.initMap();
    this.biensService.getBiens().subscribe((biens: BienImmobilier[]) => {
    
      biens.forEach((bien) => {
        
        const latStr = bien["Coordonnées GPX  X"];
        const lngStr = bien["Coordonnées GPX  Y"];


        const lat = parseFloat(latStr?.toString().trim());
        const lng = parseFloat(lngStr?.toString().trim());

        // Vérification que les coordonnées sont valides
        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = L.marker([lat, lng]).addTo(this.map);
          marker.on('click', () => {
            this.selectedProperty.set(bien);
            this.sidebarVisible.set(true);
          });
        } 
      });

      
    });
  }

  
  initMap(): void {
    this.map = L.map('map').setView([33.5899, -7.6039], 6); // Vue centrée sur le Maroc
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
