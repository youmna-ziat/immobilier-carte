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
 @Output() bienTrouve = new EventEmitter<BienImmobilier>(); // Événement à émettre vers le parent
 query: string = '';
                                                                                                                                                                                                                            
 search() {
  const q = this.query.trim().toLowerCase();

    const bien = this.biens.find(b =>
      b.Désignation?.toLowerCase().includes(q) ||
      (b['Coordonnées GPX  X']?.toString().includes(q) && b['Coordonnées GPX  Y']?.toString().includes(q))
    );

    if (bien) {
      console.log('Bien trouvé :', bien);
      this.bienTrouve.emit(bien); // Envoie le bien au parent
    } else {
      console.log('Aucun bien trouvé pour :', this.query);
    }
 }
 focusInput(){
  this.searchInputRef?.nativeElement?.focus(); //.nativeElement te donne l’objet DOM brut de l’élément HTML ciblé.
 }
}
