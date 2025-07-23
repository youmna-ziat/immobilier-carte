import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import { Icon, Marker } from 'leaflet';
import { Sidebar } from '../../sidebar/sidebar';
import { BienImmobilier, Biens } from '../../services/biens';
import 'leaflet/dist/images/marker-shadow.png';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-map',
  standalone: true, 
  imports: [CommonModule, Sidebar ,SearchBar], 
  templateUrl: './map.html', 
  styleUrls: ['./map.css'],
  providers: [Biens]
})
export class MapComponent implements OnInit {

  private biensService = inject(Biens);
  selectedProperty = signal<BienImmobilier | null>(null);
  sidebarVisible = signal(false);
  showSearchBar = signal(true);
  map!: L.Map;
  biens: BienImmobilier[] = [];
  private highlightMarker: Marker | null = null;
  designationTrouvee: string | null = null;


  @ViewChild(SearchBar) searchBarComponent!: SearchBar;

  ngOnInit(): void {
    delete (Icon.Default.prototype as any)._getIconUrl;
    
    this.initMap();

    this.biensService.getBiens().subscribe((biens: BienImmobilier[]) => {
      this.biens = biens;
      biens.forEach((bien) => {
        
        const latStr = bien["Coordonnées GPX  X"];
        const lngStr = bien["Coordonnées GPX  Y"];
        const lat = parseFloat(latStr?.toString().trim());
        const lng = parseFloat(lngStr?.toString().trim());

        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = L.marker([lat, lng], {
            icon: this.getIconForType(bien.Type)
          }).addTo(this.map);
          
          marker.on('click', () => {
            this.selectedProperty.set(bien);
            this.sidebarVisible.set(true);  
          });
        } 
      });  
    });
  }

  
  initMap(): void {
    this.map = L.map('map').setView([33.5899, -7.6039], 10); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }
   
// Méthode appelée depuis SearchBar quand un bien est trouvé
  onBienTrouve(bien: BienImmobilier) {
    this.selectedProperty.set(bien);
    this.sidebarVisible.set(true);
    this.designationTrouvee = bien.Désignation || null;

    const latStr = bien["Coordonnées GPX  X"];
    const lngStr = bien["Coordonnées GPX  Y"];
    const lat = parseFloat(latStr?.toString().trim());
    const lng = parseFloat(lngStr?.toString().trim());

    if (lat && lng) {
      this.map.flyTo([lat, lng], 15, { animate: true, duration: 1.5 }); // Zoom sur le bien
    }

    if (this.highlightMarker) {
      this.map.removeLayer(this.highlightMarker);
    };

this.highlightMarker = L.marker([lat, lng], {
  icon: L.divIcon({
    className: '', // désactive les classes par défaut
    html: `
<style>
.custom-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .label {
      margin-top: 8px;
      background: linear-gradient(145deg, #ffffff, #f0f0f0);
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 500;
      color: #2c3e50;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      white-space: nowrap;
      transition: all 0.3s ease;
    }

    .label:hover {
      background-color: #eaf4ff;
      color: #0056b3;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }      
</style>  
      <div class="custom-marker">
        <img src="images/location.png" class="location-icon" width="70" height="68" />
        <div class="label">${bien['Désignation']}</div>
      </div>
    `,
    iconSize: [28, 38],
    iconAnchor: [14, 38], // ajuste selon ton image
  })
}).addTo(this.map);

    
    this.highlightMarker.on('add', () => {
     const markerEl = (this.highlightMarker as any)._icon;
      if (markerEl) {
        markerEl.classList.add('blinking-marker');
      }
     });   
  }

  onSearchClicked() {
    // Fait apparaître le curseur directement dans la search bar
    this.searchBarComponent?.focusInput();
  }

  getIconForType(type: string) {
    let iconUrl = 'images/pin-default.png';

    switch (type?.toLowerCase()) {
      case 'immeuble':
        iconUrl = 'images/circle-button.png';
        break;
      case 'appartement':
        iconUrl = 'images/hotel.png';
        break;
      case 'parking':
        iconUrl = 'images/parking.png';
        break;
      case 'chalet':
        iconUrl = 'images/hut.png';
        break;
      case 'local':
        iconUrl = 'images/local.png';
        break;
    }
    return L.icon({
      iconUrl,
      iconSize: [20, 25],
      iconAnchor: [15, 45],
      popupAnchor: [0, -40]
    });
}
}
