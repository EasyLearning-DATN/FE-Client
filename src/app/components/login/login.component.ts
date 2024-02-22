import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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
  checkAccountAndProceed(): void {
    
  }


  // onSignup
  onSignup(): void {
    
  }
  //  onLogin
  onLogin(): void {
   
  }

  setDataUser(userInfo: any) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
    let roles = userInfo.data.roles.map((role: any) => role.name);
    localStorage.setItem('roles', JSON.stringify(roles));
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
