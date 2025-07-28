import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-type-filtre',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './type-filtre.html',
  styleUrls: ['./type-filtre.css']
})
export class TypeFiltre {
  @Input() types: string[] = [];
  @Output() filtreChange = new EventEmitter<string | null>();

  selected: string | null = null;
  choisirType(type: string) {
   if (this.selected === type) {
  this.selected = null;
  this.filtreChange.emit(null); // Réinitialiser le filtre
  }
   else {
  this.selected = type;
  this.filtreChange.emit(type); // Appliquer le filtre
  }
 }
}
