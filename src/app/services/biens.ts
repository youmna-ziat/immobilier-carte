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

// Utilise le décorateur @Injectable pour indiquer que ce service peut être injecté dans d'autres classes
@Injectable({
  providedIn: 'root' // Angular va rendre ce service disponible dans toute l'application
})

export class Biens {
  // Le constructeur reçoit un objet de type HttpClient, injecté automatiquement par Angular
  // Cela nous permet d'effectuer des requêtes HTTP (comme lire un fichier JSON)
  constructor(private http: HttpClient) {}

  // Méthode publique appelée getBiens() qui retourne un Observable contenant un tableau de BienImmobilier
  getBiens(): Observable<BienImmobilier[]> {
    // Utilise HttpClient pour faire une requête GET sur le fichier JSON
    // Le fichier doit être situé dans le dossier `public` à la racine du projet
    return this.http.get<BienImmobilier[]>('/biens.json');
  }
}

