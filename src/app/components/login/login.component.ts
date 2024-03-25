import { flatMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms'
import { UserService } from 'src/app/services/user/user-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserResponse } from "../../responses/user/user.responses";
import { LoginDTO } from "../../DTOS/user/login.dto";
import { SignupDTO } from "../../DTOS/user/signup.dto";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userResponse?: UserResponse | null;
  // khai báo các biến tương ứng với các trường dữ liệu trong form đăng nhập và đăng ký
  @ViewChild('signupForm') signupForm!: NgForm;
  @ViewChild('loginForm') loginForm!: NgForm;
  loginUserName: string = '';
  loginPassword: string = '';
  username: string = '';
  password: string = '';
  fullName: string = '';
  avatar: string = '';
  email: string = '';
  dayOfBirth: string = '';
  role: string = '';
  loginF: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  );
  signupF: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    dayOfBirth: new FormControl('', [Validators.required])
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {

  }

  login() {
    if (this.loginForm.valid) {
      const loginDTO: LoginDTO = {
        username: this.loginUserName,
        password: this.loginPassword
      };
      Swal.fire({
        title: 'Đang đăng nhập...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.userService.login(loginDTO).subscribe(
        (response: any) => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          // lấy user info và đưa thông tin vào userResponse
          this.userService.getUserInfo(token).subscribe(
            (data: any) => {
              // gọi dến getRoleUser
              this.userService.getRoleUser(data.data.id).subscribe(
                (role: any) => {
                  this.userResponse = data.data;
                if (this.userResponse) {
                this.userResponse.role = role.data[0].role;
                }
                  localStorage.setItem('userInfo', JSON.stringify(this.userResponse));
                  Swal.close(); // Đóng SweetAlert hiển thị hiệu ứng loading
                  Swal.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công!',
                    text: 'Chào mừng bạn quay trở lại!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      location.assign('/');
                    }
                  });
                },
                err => {
                  console.log(err);
                  Swal.close(); // Đóng SweetAlert hiển thị hiệu ứng loading nếu có lỗi xảy ra
                  Swal.fire({
                    icon: 'error',
                    title: 'Đăng nhập thất bại',
                    text: 'Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  });
                }
              );
            }
          )
        },
        error => {
          console.log(error);
          Swal.close(); // Đóng SweetAlert hiển thị hiệu ứng loading nếu có lỗi xảy ra
          Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại',
            text: error.error.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.log('invalid form');
    }
  }


  signup() {
    if (this.signupForm.valid) {
      const { username, password, fullName, email, dayOfBirth } = this.signupF.value;
      const SignupDTO: SignupDTO = {
        username: this.username,
        password: this.password,
        fullName: this.fullName,
        avatar: this.avatar,
        email: this.email,
        dayOfBirth: this.dayOfBirth
      };
      Swal.fire({
        title: 'Đang đăng ký...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      this.userService.signUp(SignupDTO).subscribe(
        data => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công!',
            text: 'Bạn đã đăng ký thành công tài khoản, hãy đăng nhập để tiếp tục!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              location.assign('/login');
            }
          });
        },
        error => {
          console.log(error);
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Đăng ký thất bại',
            text: 'Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.avatar = event.target.files[0];
    }
  }

  loginWithFacebook() {

  }

}
//@abacritt/angularx-social-login
