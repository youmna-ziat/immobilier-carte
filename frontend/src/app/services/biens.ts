import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BienImmobilier {

  id: string;
  entiteGestionnaire: string;
  typePropriete: string;
  reference: string;
  utilisation: string;
  code: string;
  designation: string;
  type: string;
  montant: number;
  ville: string;
  region: string;
  pays: string;
  latitude: number;
  longitude: number;
  photo: string;

}


@Injectable({
  providedIn: 'root' 
})

export class PropertyService {

  private apiUrl = 'http://localhost:5154/api/Property';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

