import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogin: any;
  isAdmin: boolean = false;
  avatar: any;
  isMenuCollapsed = true;
  keyword = "";
  isCreateOpened = false;

  constructor(private router: Router, private translate: TranslateService) {
  }

  ngOnInit(): void {

  }

  onLogout() {

  }

  onSearch() {

  }

  onGoToSearchPage() {
    this.router.navigate(['search']);
    this.onSearch();
  }
}
