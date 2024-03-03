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
    // lấy token từ localStorage
    const token = localStorage.getItem('token');
    // nếu có token thì gọi api lấy thông tin user
    if (token) {
      this.userService.getUserInfo(token).subscribe(
        (data: UserResponse) => {
          this.userResponse = data;
          console.log(this.userResponse);
        }
      )
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    // load lại trang
    window.location.reload();
  }

  onSearch() {

  }

  onGoToSearchPage() {
    this.router.navigate(['search']);
    this.onSearch();
  }
}
