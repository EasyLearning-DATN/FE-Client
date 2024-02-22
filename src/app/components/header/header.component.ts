import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sLogin: any;
  isAdmin: boolean = false;
  avatar: any;
  keyword = "";

  constructor() {

  }

  ngOnInit(): void {
    
  }

  onLogout() {
   
  }

  onSearch() {
   
  }

  onGoToSearchPage() {
    
  }
}
