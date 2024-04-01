import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserResponse} from 'src/app/responses/user/user.responses';
import {UserService} from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;
  avatar: any;
  isMenuCollapsed = true;
  keyword = '';
  isCreateOpened = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'u') {
      event.preventDefault();
    }
    if (event.key === 'F12') {
      event.preventDefault();
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    event.preventDefault(); 
  }

  ngOnInit() {
    // truyển userResponse từ localStorage
    this.userResponse = JSON.parse(localStorage.getItem('userInfo') || '');
    this.avatar = this.userResponse?.avatar;
  }

  onLogout() {
    const token = localStorage.getItem('token') || '';
    Swal.fire({
      title: 'Đang đăng xuất...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.userService.logout(token).subscribe(res => {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      location.assign('/');
    });
  }

}
