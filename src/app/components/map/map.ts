import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent implements OnInit {
  map!: L.Map;

  ngOnInit(): void {
    const involysData = {
  nom: 'Involys',
  designation: 'Immeuble Bureaux Involys',
  type: 'Propriété',
  reference: 'INV-PRO-6712',
  montant: '2,450,000 DH',
  photo: 'https://www.leconomiste.com/sites/default/files/eco7/public/nouveau-siege-involys.jpg'
};
    this.map = L.map('map').setView([31.7917, -7.0926], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    const emojiIcon = L.divIcon({
    html: '<div style="font-size: 30px; line-height: 1;">📍</div>',  // Taille et style ici
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 30],
  });

    L.marker([33.56660, -7.63581], { icon: emojiIcon }).addTo(this.map)
      .bindPopup(`
        <div class="popup-content">
        <h3>${involysData.nom}</h3>
        <p><strong>${involysData.designation}</strong></p>
        <p>Type : ${involysData.type}</p>
        <p>Référence : ${involysData.reference}</p>
        <p>Montant : ${involysData.montant}</p>
        <img src="${involysData.photo}" alt="${involysData.nom}" style="width:100%; border-radius:10px; margin-top:10px;" />
        </div>
      `)
      .openPopup();
  }

}
