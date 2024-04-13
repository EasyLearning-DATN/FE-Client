import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ChangePassDTO} from 'src/app/DTOS/user/changePass.dto';
import {LoginDTO} from 'src/app/DTOS/user/login.dto';
import {SignupDTO} from 'src/app/DTOS/user/signup.dto';
import {UpdateInfoDTO} from 'src/app/DTOS/user/updateInfo.dto';
import {UserResponse} from 'src/app/responses/user/user.responses';
import {environment} from 'src/environments/environments';
import {ContinueGoogoleDto} from '../../DTOS/user/continueGoogole.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiLogin = `${environment.apiExternal}/user/authenticate`;
  private apiSignup = `${environment.apiExternal}/user/sign-up`;
  private apiForgotPassword = `${environment.apiExternal}/user/get-token-forgot-pass?email=`;
  private apiUpdatePassword = `${environment.apiMember}/user/forgot-pass`;
  private apiVaildToken = `${environment.apiExternal}/user/valid-token?token=`;
  private apiLogout = `${environment.apiMember}/user/logout`;
  private apiUpdateInfo = `${environment.apiMember}/user/info`;
  private apiGetRole = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_USER + environment.API_ROLE;
  private apiLockAccount = `${environment.apiMember}/user/lock`;
  private apiChangePassword = `${environment.apiMember}/user/password`;
  private apiContinueGoogle = `${environment.apiExternal}/user/continue-google`;

  constructor(private http: HttpClient) {
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO);
  }

  continueGoogle(continueGoogoleDto: ContinueGoogoleDto): Observable<any> {
    return this.http.post(this.apiContinueGoogle, continueGoogoleDto);
  }

  signUp(signupDTO: SignupDTO): Observable<any> {
    const formData = new FormData();
    formData.append('username', signupDTO.username);
    formData.append('password', signupDTO.password);
    formData.append('fullName', signupDTO.fullName);
    formData.append('email', signupDTO.email);
    formData.append('avatar', signupDTO.avatar);
    formData.append('dayOfBirth', signupDTO.dayOfBirth);
    return this.http.post(this.apiSignup, formData);
  }


  forgotPassword(email: string) {
    return this.http.get(this.apiForgotPassword + email);
  }

  logout(token: string): Observable<any> {
    return this.http.post(this.apiLogout, null);
  }

  // hàm validate token
  validateToken(token: string): Observable<any> {
    return this.http.get(this.apiVaildToken + token);
  }

  // hàm confirm password có sử dụng bearer token và body là newPassword
  // lấy ?token trên url và gán vào biến token http://localhost:4200/confirm-password?token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmY2VjYTU5Yi00N2Q0LTQyZTAtOGQ3NS00OTJlYTMzOTY0YzMiLCJzdWIiOiJhbmhkdDA3IiwiaWF0IjoxNzA5NDcyNzY3LCJleHAiOjE3MTEyNzI3Njd9.ti5LCGHG4239VNa_JmxlXVynnnbnSsbq0fQVxFVVFRQ
  updatePassword(password: string, token: string): Observable<any> {
    return this.http.patch(this.apiUpdatePassword, {password_update: password}, {
      headers: {'Authorization': `Bearer ${token}`},
    });
  }

  //  lấy user info từ token sử dụng bearer token
  getUserInfo(token: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.apiMember}/user/info`);
  }

  // hàm update info user có sử dụng bearer token và body là fullName, email, dayOfBirth
  updateInfo(updateInfoDTO: UpdateInfoDTO): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.patch(this.apiUpdateInfo, updateInfoDTO, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // hàm change password có sử dụng bearer token và body là password_old, password_new
  changePassword(changePassDTO: ChangePassDTO): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.patch(this.apiChangePassword, changePassDTO, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // hàm lock account từ token sử dụng bearer token
  lockAccount(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.patch(this.apiLockAccount, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // get all role
  getAllRole(): Observable<any> {
    return this.http.get(this.apiGetRole + '/all');
  }

  // get role user
  getRoleUser(userId: any): Observable<any> {
    let Params = new HttpParams();
    Params = Params.append('userId', userId);
    return this.http.get(this.apiGetRole, {
      params: Params,
    });
  }


  updateRoleUser(userID: any): Observable<any> {
    return this.http.put(this.apiGetRole, {
      userID,
      roleIds: ['1ea38000-e236-4291-8f2e-8023ca323479'],
    });
  }
}

