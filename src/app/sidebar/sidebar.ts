import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  showSearch = signal(false);
  showList = signal(false);

  toggleSearch() {
    this.showSearch.update(prev => !prev);
    if (this.showSearch()) this.showList.set(false);  // cache la liste si on affiche la recherche
  }
  

  toggleList() {
    this.showList.update(prev => !prev);
      if (this.showList()) this.showSearch.set(false);
  }
}
