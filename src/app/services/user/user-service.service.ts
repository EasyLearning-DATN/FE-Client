import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/app/dtos/user/login.dto';
import { SignupDTO } from 'src/app/dtos/user/signup.dto';
import { UserResponse } from 'src/app/responses/user/user.responses';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiLogin = `${environment.apiExternal}/user/authenticate`;
  private apiSignup = `${environment.apiExternal}/user/sign-up`;
  private apiForgotPassword = `${environment.apiExternal}/user/get-token-forgot-pass?email=`;
  private apiUpdatePassword = `${environment.apiMember}/user/password`;
  private apiVaildToken = `${environment.apiExternal}/user/valid-token?token=`;
  private apiLogout = `${environment.apiMember}/user/logout`;

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO);
  }

  signUp(signupDTO: SignupDTO): Observable<any> {
    return this.http.post(this.apiSignup, signupDTO);
  }

  forgotPassword(email: string){
    return this.http.get(this.apiForgotPassword + email)
  }

  logout(token: string): Observable<any> {
    return this.http.post(this.apiLogout, null, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
  }

  // hàm validate token
  validateToken(token: string): Observable<any> {
    return this.http.get(this.apiVaildToken + token);
  }

  // hàm confirm password có sử dụng bearer token và body là newPassword
  // lấy ?token trên url và gán vào biến token http://localhost:4200/confirm-password?token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmY2VjYTU5Yi00N2Q0LTQyZTAtOGQ3NS00OTJlYTMzOTY0YzMiLCJzdWIiOiJhbmhkdDA3IiwiaWF0IjoxNzA5NDcyNzY3LCJleHAiOjE3MTEyNzI3Njd9.ti5LCGHG4239VNa_JmxlXVynnnbnSsbq0fQVxFVVFRQ
  updatePassword(password: string, token: string): Observable<any> {
    return this.http.patch(this.apiUpdatePassword, {
      password
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  //  lấy user info từ token sử dụng bearer token
  getUserInfo(token: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.apiMember}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

