import { flatMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms'
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { UserService } from 'src/app/services/user/user-service.service';
import { Router } from '@angular/router';
import { SignupDTO } from '../user/signup.dto';
import Swal from 'sweetalert2';
import { LoginDTO } from '../user/login.dto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // khai báo các biến tương ứng với các trường dữ liệu trong form đăng nhập và đăng ký
  @ViewChild('signupForm') signupForm!: NgForm;
  @ViewChild('loginForm') loginForm!: NgForm;
  loginUserName: string = '';
  loginPassword: string = '';
  username: string = '';
  password: string = '';
  fullName: string = '';
  email: string = '';
  dayOfBirth: string = '';
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
    private socialAuthService: SocialAuthService,
    private router: Router,
    private userService: UserService) {

  }

  login() {
    if (this.loginForm.valid) {
      const loginDTO: LoginDTO = {
        username: this.loginUserName,
        password: this.loginPassword
      };
      console.log(loginDTO);
      this.userService.login(loginDTO).subscribe(
        (response: any) => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công!',
            text: 'Bạn đã đăng nhập thành công tài khoản!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        },
        error => {
          console.log(error);
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
        email: this.email,
        dayOfBirth: this.dayOfBirth
      };
      this.userService.signUp(SignupDTO).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Đăng ký thành công!',
            text: 'Bạn đã đăng ký thành công tài khoản, hãy đăng nhập để tiếp tục!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  loginWithFacebook() {

  }

}
//@abacritt/angularx-social-login
