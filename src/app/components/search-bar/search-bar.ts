import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BienImmobilier } from '../../services/biens';

@Component({
  selector: 'app-search-bar',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBar {
 @Input() visible: boolean = false;
 @Input() biens: BienImmobilier[] = [];
 @ViewChild('searchInput') searchInputRef!: ElementRef; //ElementRef est une classe Angular qui te donne accès à un élément du DOM.
 @Output() bienTrouve = new EventEmitter<BienImmobilier | undefined>(); // Événement à émettre vers le parent
 query: string = '';
 messageErreur: string = '';                                                                                                                                                                                                                          
 search() {
  const q = this.query.trim().toLowerCase();

  if (!q) {
    this.bienTrouve.emit(undefined); 
    this.messageErreur = ''; 
    return;
  }


  const parts = q.split(/\s+/);
  let bien;

  if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
    // Recherche par coordonnées (latitude + longitude)
    const latInput = parseFloat(parts[0]);
    const lngInput = parseFloat(parts[1]);

    bien = this.biens.find(b => {
      const lat = parseFloat(String(b['Coordonnées GPX  X']));
      const lng = parseFloat(String(b['Coordonnées GPX  Y']));
      return lat === latInput && lng === lngInput;
    });
  } else {
    // Recherche par nom
    bien = this.biens.find(b =>{
      const designation = b.Désignation?.toLowerCase() || '';
    return parts.every(word => designation.includes(word));
  });
  }

  if (bien) {
    this.bienTrouve.emit(bien);
  } else {
    this.bienTrouve.emit(undefined);
    console.log('Aucun bien trouvé pour :', this.query);
  }
}

 focusInput(){
  this.searchInputRef?.nativeElement?.focus(); //.nativeElement te donne l’objet DOM brut de l’élément HTML ciblé.
 }

 getQuery(): string {
  return this.query;
}

}
