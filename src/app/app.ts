import { Component } from '@angular/core';
import { MapComponent } from './components/map/map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'immobilier-carte';
}
