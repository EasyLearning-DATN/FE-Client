import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePassDTO } from 'src/app/DTOS/user/changePass.dto';
import { UserResponse } from 'src/app/responses/user/user.responses';
import { UserService } from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';
import { UpdateInfoDTO } from '../../../DTOS/user/updateInfo.dto';
import { SharedService } from '../../../services/shared/shared.service';
import { UploadImageService } from '../../../services/shared/upload/upload-image.service';
import { ConfirmModalComponent } from '../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user !: UserResponse;
  userInfoChangeForm !: FormGroup;
  changePasswordForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]),
    confirmNewPass: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]),
  });
  checkUpdate: boolean = false;
  image: string = '';
  private closeResult = '';
  role: any = '';

  constructor(
    private userService: UserService, private sharedService: SharedService, private imageService:
      UploadImageService, private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.sharedService.userInfoChanged.subscribe(
      (user) => {
        this.user = JSON.parse(localStorage.getItem('userInfo') || '');
      },
    );
    // truyển userResponse từ localStorage
    this.user = JSON.parse(localStorage.getItem('userInfo') || '');
    this.userService.getRoleUser(this.user.id)
      .subscribe(
        (response: any) => {
          this.role = response.data[0].role;
        }
      );
    this.userInfoChangeForm = new FormGroup({
      fullName: new FormControl(this.user.fullName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      dayOfBirth: new FormControl(this.user.dayOfBirth, [Validators.required]),
    });
    console.log(this.checkUpdate);
    if (!this.checkUpdate) {
      this.userInfoChangeForm?.disable();
      this.changePasswordForm?.disable();
    }
  }

  edit() {
    const modalConfirm = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    modalConfirm.componentInstance.body = 'Bạn có muốn chỉnh sửa thông tin không?';
    modalConfirm
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.closeResult);
          if (result === 'Confirm') {
            this.checkUpdate = true;
            this.userInfoChangeForm?.enable();
            this.changePasswordForm?.enable();
            console.log(this.checkUpdate);
            console.log(result);
          } else {
            this.checkUpdate = false;
            this.userInfoChangeForm?.disable();
            this.changePasswordForm?.disable();
            console.log(this.checkUpdate);
            console.log(result);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        },
      );
  }

  updateInfo() {
    if (this.userInfoChangeForm.valid) {
      const modalConfirm = this.modalService.open(ConfirmModalComponent);
      const updateInfoDTO: UpdateInfoDTO = {
        fullName: <string>this.userInfoChangeForm.get('fullName')?.value,
        email: <string>this.userInfoChangeForm.get('email')?.value,
        dayOfBirth: <string>this.userInfoChangeForm.get('dayOfBirth')?.value,
      };
      // modalConfirm.componentInstance.title ="";
      modalConfirm.componentInstance.body = 'Bạn có muốn chỉnh sửa thông tin không?';
      modalConfirm
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
            console.log(this.closeResult);
            if (result === 'Confirm') {
              Swal.fire({
                title: 'Đang chỉnh sửa...',
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
              this.userService.updateInfo(updateInfoDTO)
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
                      },
                    );
                    this.modalService.dismissAll('Update success!');
                  }, error => {
                    Swal.close();
                    Swal.fire({
                      icon: 'error',
                      title: 'Sửa thông tin thất bại!',
                      text: 'Có lỗi xảy ra trong quá trình cập nhật thông tin. Bạn đã cập nhật thông tin thất bại!',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'OK',
                    });
                  },
                );
              console.log(result);
            }
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log(this.closeResult);
          },
        );
    } else {
      this.userInfoChangeForm.markAllAsTouched();
      console.log('invalid form');
    }
  }

  changePass() {
    if (this.changePasswordForm.valid) {
      const modalConfirm = this.modalService.open(ConfirmModalComponent);
      const changePassDTO: ChangePassDTO = {
        password_old: <string>this.changePasswordForm.get('oldPass')?.value,
        password_new: <string>this.changePasswordForm.get('newPass')?.value,
      };
      // modalConfirm.componentInstance.title ="";
      modalConfirm.componentInstance.body = 'Bạn có muốn đổi mật khẩu không?';
      modalConfirm
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
            console.log(this.closeResult);
            if (result === 'Confirm') {
              if (changePassDTO.password_new === this.changePasswordForm.get('confirmNewPass')?.value) {
                Swal.fire({
                  title: 'Đang cập nhật...',
                  allowOutsideClick: false,
                  didOpen: () => {
                    Swal.showLoading();
                  },
                });
                this.userService.changePassword(changePassDTO)
                  .subscribe(
                    (response) => {
                      console.log(response);
                      Swal.close();
                      Swal.fire({
                        icon: 'success',
                        title: 'Đổi mật khẩu thành công!',
                        text: 'Bạn đã đổi mật khẩu thành công!',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                      });
                      this.modalService.dismissAll('Update success!');
                    }, error => {
                      Swal.close();
                      Swal.fire({
                        icon: 'error',
                        title: 'Đổi mật khẩu thất bại!',
                        text: 'Mật khẩu cũ không chính xác. Vui lòng thử lại!',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                      });
                    },
                  );
              } else {
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: 'Đổi mật khẩu thất bại!',
                  text: 'Xác nhận mật khẩu không trùng khớp!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
              }
              console.log(result);
            }
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log(this.closeResult);
          },
        );
    } else {
      this.changePasswordForm.markAllAsTouched();
      console.log('invalid form');
    }
  }

  lockAccount() {
    const modalConfirm = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    modalConfirm.componentInstance.body = 'Bạn có muốn xoá tài khoản không?';
    modalConfirm
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          console.log(this.closeResult);
          if (result === 'Confirm') {
            Swal.fire({
              title: 'Đang xoá...',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            // const token = localStorage.getItem('token') || '';
            this.userService.lockAccount()
              .subscribe(
                (response) => {
                  console.log(response);
                  const token = localStorage.getItem('token') || '';
                  this.userService.logout(token).subscribe(res => {
                    Swal.close();
                    Swal.fire({
                      icon: 'success',
                      title: 'Xoá tài khoản thành công!',
                      text: 'Bạn đã xoá tài khoản thành công!',
                    });
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('token');
                    location.assign('/');
                  });
                  this.modalService.dismissAll('Update success!');
                }, error => {
                  Swal.close();
                  Swal.fire({
                    icon: 'error',
                    title: 'Xoá tài khoản thất bại!',
                    text: 'Có lỗi xảy ra trong quá trình xoá tài khoản. Vui lòng thử lại sau!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  });
                },
              );
            console.log(result);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(this.closeResult);
        },
      );
  }


  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
