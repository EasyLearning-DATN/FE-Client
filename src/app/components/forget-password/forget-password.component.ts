import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(
    private FormBuilder: FormBuilder,
    private userService: UserService
  ) { }

  resetPasswordForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email])
    }
  );

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      // truyền email từ form vào hàm forgotPassword
      console.log(this.resetPasswordForm.get('email')?.value);
      this.userService.forgotPassword(this.resetPasswordForm.get('email')?.value).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Thành công!',
            text: 'Vui lòng kiểm tra email để lấy liên kết đặt lại mật khẩu!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          // thông báo lỗi 
          Swal.fire({
            title: 'Lỗi!',
            text: error.error.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      this.resetPasswordForm.markAllAsTouched();
      console.log('invalid form');
    }
  }

}
