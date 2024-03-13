import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { UserResponse } from 'src/app/responses/user/user.responses';
import { UserService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  userResponse?: UserResponse | null;
  fullName: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    // truyển userResponse từ localStorage
    this.userResponse = JSON.parse(localStorage.getItem('userInfo') || '');
    this.fullName = this.userResponse?.fullName;
  }
}
