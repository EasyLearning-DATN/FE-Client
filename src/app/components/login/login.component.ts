import {environment} from "../../../environments/environments";

declare var google: any;
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, NgForm} from '@angular/forms'
import {UserService} from 'src/app/services/user/user-service.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {UserResponse} from "../../responses/user/user.responses";
import {LoginDTO} from "../../DTOS/user/login.dto";
import {SignupDTO} from "../../DTOS/user/signup.dto";
import {ContinueGoogoleDto} from "../../DTOS/user/continueGoogole.dto";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  google: any;
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
    re_password: new FormControl(''),
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    dayOfBirth: new FormControl('', [Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {

  }

  ngOnInit(): void {
    google.accounts.id.initialize
    ({
      client_id: "12657364022-uhc8klb6t57fkeqvvcb0fjfoscsjf2c3.apps.googleusercontent.com",
      callback: (resp: any) => {
        this.continueGoole(resp.credential);
      }
    })

    google.accounts.id.renderButton(document.getElementById("google-btn-login"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      text: 'signUp',
      with: 350
    })
    google.accounts.id.renderButton(document.getElementById("google-btn-register"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      with: 350
    })
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
      Object.values(this.loginForm.form.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log('invalid form');
    }
  }

  continueGoole(tokenGoogle:string) {
    const continueGoogoleDto: ContinueGoogoleDto = {
      token: tokenGoogle,
    };
    Swal.fire({
      title: 'Đang đăng nhập...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    this.userService.continueGoogle(continueGoogoleDto).subscribe(
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
  }


  signup() {
    if (this.signupForm.valid) {
      const {username, password, fullName, email, dayOfBirth} = this.signupF.value;
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
    } else {
      Object.values(this.signupForm.form.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log('invalid form');
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.avatar = event.target.files[0];
    }
  }

  loginWithFacebook() {

  }

  // check password và re_password có giống nhau không
  checkPassword() {
    if (this.signupF.value.password !== this.signupF.value.re_password) {
      this.signupF.controls["re_password"].setErrors({ notMatch: true });
    } else {
      this.signupF.controls["re_password"].setErrors(null);
    }
  }
  

}

//@abacritt/angularx-social-login
