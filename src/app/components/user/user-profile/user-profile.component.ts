import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfoResponse, UserResponse} from 'src/app/responses/user/user.responses';
import {UserService} from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';
import {SharedService} from '../../../services/shared/shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userResponse?: UserResponse | null;
  user !: UserInfoResponse;
  langForm = new FormGroup({
    lang: new FormControl('vi'),
  });
  role: any = '';
  lang!: string;

  constructor(
    private userService: UserService, private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.user = this.sharedService.user;
    
    this.userResponse = JSON.parse(localStorage.getItem('userInfo') || '');
    this.role = this.userResponse?.role;
  }

}
