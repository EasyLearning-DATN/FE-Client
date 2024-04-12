import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';
import {TRANSLATE} from '../../../environments/environments';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  resetPasswordForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
    },
  );

  constructor(
    // private FormBuilder: FormBuilder,
    private userService: UserService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      // truyền email từ form vào hàm forgotPassword
      console.log(this.resetPasswordForm.get('email')?.value);
      let title = '';
      this.translateService.stream(TRANSLATE.MESSAGE.PROGRESS.FORGET_PASSWORD_001).subscribe(
        res => {
          title = res;
        },
      );
      Swal.fire({
        title: title,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.userService.forgotPassword(this.resetPasswordForm.get('email')?.value).subscribe(
        (response: any) => {
          Swal.close();
          let title = '';
          this.translateService.stream(TRANSLATE.MESSAGE.SWAL_TITLE_SUCCESS).subscribe(
            res => {
              title = res;
            },
          );
          let text = '';
          this.translateService.stream(TRANSLATE.MESSAGE.PROGRESS.FORGET_PASSWORD_001).subscribe(
            res => {
              text = res;
            },
          );
          Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        (error) => {
          // thông báo lỗi
          Swal.close();
          let title = '';
          this.translateService.stream(TRANSLATE.MESSAGE.SWAL_TITLE_ERROR).subscribe(
            res => {
              title = res;
            },
          );
          Swal.fire({
            title: title,
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      );
    } else {
      this.resetPasswordForm.markAllAsTouched();
      console.log('invalid form');
    }
  }

}
