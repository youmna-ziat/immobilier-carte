import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BienImmobilier {
  Code: string;
  Désignation: string;
  Type: string;
  ['Entité gestionnaire']: string;
  ['Type de propritété']: string;
  ['Référence (Réquisition/Titre foncier/contrat locationà)']: string;
  Montant: number;
  Utilisation: string;
  ['Ville/Province']: string;
  Région: string;
  Pays: string;
  ['Coordonnées GPX  X']: number;
  ['Coordonnées GPX  Y']: number;
  ['Phtoto 1']: string;
}


@Injectable({
  providedIn: 'root' 
})

export class Biens {
  
  constructor(private http: HttpClient) {}

  
  getBiens(): Observable<BienImmobilier[]> {
    
    return this.http.get<BienImmobilier[]>('/biens.json');
  }
}

