import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBar } from '../search-bar/search-bar';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SearchBar ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  showSearchBar = signal(false);
  showList = signal(false);

  toggleSearch() {
    this.showSearchBar.update(prev => !prev);
    if (this.showSearchBar()) this.showList.set(false); 
  }
  
  @Output() searchClicked = new EventEmitter<void>();
  onSearchClick() {
    this.searchClicked.emit(); 
  }

  @Output() listClicked = new EventEmitter<void>();

  toggleList() {
    this.showList.update(prev => !prev);
    if (this.showList()) this.showSearchBar.set(false);
    this.listClicked.emit();
  }
}
