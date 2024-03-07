import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { UserResponse } from 'src/app/responses/user/user.responses';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  avatar: any;
  isMenuCollapsed = true;
  keyword = "";
  isCreateOpened = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    // truyển userResponse từ localStorage
    this.userResponse = JSON.parse(localStorage.getItem('userInfo') || '');
    this.avatar = this.userResponse?.avatar;
  }

  onLogout() {
    const token = localStorage.getItem('token') || '';
    this.userService.logout(token).subscribe(res => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      location.assign('/');
    });
  }

  onSearch() {

  }

  onGoToSearchPage() {
    this.router.navigate(['search']);
    this.onSearch();
  }
}
