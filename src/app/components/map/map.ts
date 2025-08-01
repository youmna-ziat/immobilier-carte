import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import { Icon, Marker } from 'leaflet';
import { Sidebar } from '../sidebar/sidebar';
import { BienImmobilier, Biens } from '../../services/biens';
import { SearchBar } from '../search-bar/search-bar';
import { TypeFiltre } from '../type-filtre/type-filtre';

import 'leaflet/dist/images/marker-shadow.png';

@Component({
  selector: 'app-map',
  standalone: true, 
  imports: [CommonModule, Sidebar ,SearchBar, TypeFiltre], 
  templateUrl: './map.html', 
  styleUrls: ['./map.css'],
  providers: [Biens]
})
export class MapComponent implements OnInit {

  private biensService = inject(Biens);

  selectedProperty = signal<BienImmobilier | null>(null);
  sidebarVisible = signal(false);
  showSearchBar = signal(true);
  errorMessage: string | null = null;
  listVisible = signal(false);
  entitesGestionnaires = signal<string[]>([]);

  map!: L.Map;
  private highlightMarker: Marker | null = null;

  biens: BienImmobilier[] = [];
  private markers: { bien: BienImmobilier, marker: L.Marker }[] = [];

  @ViewChild(SearchBar) searchBarComponent!: SearchBar;

  ngOnInit(): void {

    this.initMap();

    this.biensService.getBiens().subscribe((data: BienImmobilier[]) => {
      this.biens = data; 
      this.afficherBiensSurMap(data);
    });
  }

  initMap(): void {
    this.map = L.map('map').setView([31.7917, -7.0926], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  afficherBiensSurMap(biens: BienImmobilier[]): void {
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

        this.markers.push({ bien, marker });
    }
    });
  }

  
  filtrerParUtilisation(utilisation: string | null): void {
    this.markers.forEach(({ bien, marker }) => {
    const doitAfficher = !utilisation || bien.Utilisation === utilisation;

    if (doitAfficher) {
      marker.addTo(this.map); 
    } else {
      this.map.removeLayer(marker); 
    }
  });
  }

  getUtilisationsDisponibles(): string[] {
    return [...new Set(this.biens.map(b => b.Utilisation))].filter(Boolean);
  }
   

  onBienTrouve(bien: BienImmobilier | undefined) {
  
  if (this.highlightMarker) {
    this.map.removeLayer(this.highlightMarker);
    this.highlightMarker = null;
  }
  const rawQuery = this.searchBarComponent?.getQuery();
  const query = typeof rawQuery === 'string' ? rawQuery.trim() : '';


  if (!bien) {
  this.sidebarVisible.set(false);
  this.selectedProperty.set(null);
  this.map.setView([33.5899, -7.6039], 10);
  if (query === '') {
      this.errorMessage = null;
    } else {
      this.errorMessage = "Aucun bien trouvé pour les coordonnées ou le nom saisi.";
    }
    return;
}
  this.errorMessage = null;
  
  this.selectedProperty.set(bien);
  this.sidebarVisible.set(true);

  const latStr = bien["Coordonnées GPX  X"];
  const lngStr = bien["Coordonnées GPX  Y"];
  const lat = parseFloat(latStr?.toString().trim());
  const lng = parseFloat(lngStr?.toString().trim());

  if (!isNaN(lat) && !isNaN(lng)) {
    this.map.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });
  }

  this.highlightMarker = L.marker([lat, lng], {
    icon: L.divIcon({
      className: '',
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
      iconAnchor: [14, 38],
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
  
    this.searchBarComponent?.focusInput();
  }

  getIconForType(type: string): L.Icon {
  return L.icon({
    iconUrl: 'images/pin.png', 
    iconSize: [20, 30],
    iconAnchor: [10, 20],
    popupAnchor: [0, -40]
  });
}

closeSidebar(): void {
  this.sidebarVisible.set(false);
  this.selectedProperty.set(null); 
}

onListClicked() {
  this.listVisible.update(prev => !prev);
  if (this.listVisible()) {
    const entites: string[] = (this.biens as BienImmobilier[])
      .map((b: BienImmobilier) => b['Entité gestionnaire'])
      .filter((entite): entite is string => typeof entite === 'string' && entite.trim() !== '');

    const uniques = Array.from(new Set(entites));
    this.entitesGestionnaires.set(uniques);
  }
}

filtrerParEntite(entite: string): void {
  
  this.markers.forEach(({ bien, marker }) => {
    const doitAfficher = bien['Entité gestionnaire'] === entite;
    if (doitAfficher) {
      marker.addTo(this.map);
    } else {
      this.map.removeLayer(marker);
    }
  });

  const bienActuel = this.selectedProperty();
  if (bienActuel && bienActuel['Entité gestionnaire'] !== entite) {
    this.selectedProperty.set(null);
    this.sidebarVisible.set(false);
  }
}
}
