import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {switchMap} from 'rxjs/operators';
import {UserService} from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';
import {TRANSLATE} from '../../../../environments/environments';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent {
  resetPasswordForm: FormGroup = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')]),
    },
  );

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
  ) {
  }

  onConfirm() {
    let title = '';
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
    if (this.resetPasswordForm.valid) {
      if (newPassword===confirmPassword) {
        this.translateService.get(TRANSLATE.MESSAGE.PROGRESS.FORGET_PASSWORD_CONFIRM_001).subscribe(
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
        this.route.queryParams.pipe(
          switchMap(params => {
            const token = params['token'];
            // Gửi yêu cầu validate đến API
            return this.userService.validateToken(token);
          }),
        ).subscribe(
          (response) => {
            const newToken = response.data; // Giả sử API trả về token mới dưới dạng newToken
            console.log('new pass: ' + newPassword, newToken);
            // Sử dụng token mới để gọi hàm updatePassword
            this.userService.updatePassword(newPassword, newToken).subscribe(
              (data) => {
                console.log(data);
                Swal.close();
                this.translateService.get(TRANSLATE.MESSAGE.SUCCESS.FORGET_PASSWORD_CONFIRM_001).subscribe(
                  res => {
                    title = res;
                  },
                );
                Swal.fire({
                  icon: 'success',
                  title: title,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
                this.router.navigate(['/login']);
              },
              (error) => {
                console.log(error);
                Swal.close();
                let title = '';
                this.translateService.get(TRANSLATE.MESSAGE.ERROR.FORGET_PASSWORD_CONFIRM_001).subscribe(
                  res => {
                    title = res;
                  },
                );
                Swal.fire({
                  icon: 'error',
                  title: title,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
              },
            );
          },
          (error) => {
            console.log(error);
            Swal.close();
            this.translateService.get(TRANSLATE.MESSAGE.ERROR.TOKEN_001).subscribe(
              res => {
                title = res;
              },
            );
            Swal.fire({
              icon: 'error',
              title: title,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
          },
        );
      } else {
        Swal.close();
        this.translateService.get(TRANSLATE.MESSAGE.ERROR.FORGET_PASSWORD_CONFIRM_002).subscribe(
          res => {
            title = res;
          },
        );
        Swal.fire({
          icon: 'error',
          title: title,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      }
    } else {
      this.resetPasswordForm.markAllAsTouched();
      console.log('invalid form');
    }
  }
}
