import { flatMap } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser!: string;
  isLoggedin?: boolean;
  loginForm!: FormGroup;
  isAccountExisted: boolean = false;
  inCorrectPass: boolean = false;
  accountNotExist: boolean = false;

  constructor(
    private formBuilder: FormBuilder) {
  }
  loginF: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  );
  signupF: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    }
  );
  ngOnInit() {
   
  }
  

  // onSignup
  onSignup(): void {
   
  }
  //  onLogin
  onLogin(): void {
    
  }

  resetPassword() : void {

  }

  setDataUser(userInfo: any) {
    
  }

  loginWithFacebook(): void {
  
  }
  signupWithSocial(user: any): void {
  
  }
  prepareSignupData(user: any): any {
  
  }
  logOut(): void {
   
  }
}
//@abacritt/angularx-social-login
