import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import {ModalDismissReasons, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { UserResponse } from 'src/app/responses/user/user.responses';
import { UserService } from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';
import {SharedService} from "../../services/shared/shared.service";
import {UploadImageService} from "../../services/shared/upload/upload-image.service";
import {UserDTO} from "../../DTOS/user/updateInfo.dto";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user !: UserResponse;
  userInfoChangeForm !: FormGroup;

  constructor(
    private userService: UserService, private sharedService: SharedService, private imageService: UploadImageService, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.sharedService.userInfoChanged.subscribe(
      (user) => {
        this.user = JSON.parse(localStorage.getItem('userInfo') || '');
      },
    );
    // truyển userResponse từ localStorage
    this.user = JSON.parse(localStorage.getItem('userInfo') || '');
    this.userInfoChangeForm = new FormGroup({
      fullName: new FormControl(this.user.fullName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      dayOfBirth: new FormControl(this.user.dayOfBirth, [Validators.required])
    });
    
  }

  updateInfo() {
    const userDTO: UserDTO = {
      fullName: <string>this.userInfoChangeForm.get('fullName')?.value,
      email: <string>this.userInfoChangeForm.get('email')?.value,
      dayOfBirth: <string>this.userInfoChangeForm.get('dayOfBirth')?.value,
    };
    this.userService.updateInfo(userDTO)
    .subscribe(
      (response) => {
        console.log(response);
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Sửa thông tin thành công!',
          text: 'Bạn đã cập nhật thông tin thành công!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        const token = localStorage.getItem('token') || '';
        this.userService.getUserInfo(token).subscribe(
          (response: any) => {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            this.sharedService.userInfoChanged.next(response.data);
          }, error => {
            console.log(error);
          }
        );
        this.modalService.dismissAll('Update success!');
      }, error => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Sửa thông tin thất bại!',
          text: 'Bạn đã cập nhật thông tin thất bại!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      },
    );
  }
}
