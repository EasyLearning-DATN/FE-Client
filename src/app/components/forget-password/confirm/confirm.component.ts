import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user-service.service';
import { environment } from 'src/environments/environments';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  }
  );

  ngOnInit(): void {
  }

  onConfirm() {
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
    if (this.resetPasswordForm.valid) {
      if (newPassword === confirmPassword) {
        Swal.fire({
          title: 'Đang đặt lại...',
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
          })
        ).subscribe(
          (response) => {
            const newToken = response.data; // Giả sử API trả về token mới dưới dạng newToken
            console.log('new pass: ' + newPassword, newToken);
            // Sử dụng token mới để gọi hàm updatePassword
            this.userService.updatePassword(newPassword, newToken).subscribe(
              (data) => {
                console.log(data);
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Đặt lại mật khẩu thành công!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
                this.router.navigate(['/login']);
              },
              (error) => {
                console.log(error);
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: 'Đặt lại mật khẩu thất bại!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
              }
            );
          },
          (error) => {
            console.log(error);
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Token không hợp lệ!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
          }
        );
      } else {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Đặt lại mật khẩu thất bại!',
          text: 'Xác nhận mật khẩu không trùng khớp!',
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
