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
  @ViewChild('resetPasswordForm') resetPasswordFormDirective: any;
  email: string = '';

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
    // truyền email từ form vào hàm forgotPassword
    this.userService.forgotPassword(this.email).subscribe(
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
  }

}
