import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user-service.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
    @ViewChild('newPassword') newPassword: any;
    password: string = '';
    confirmPassword: string = '';
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private router: Router
    ) { }
  
    ngOnInit(): void {
    }
    
    onConfirm() {
      this.route.queryParams.pipe(
        switchMap(params => {
          const token = params['token'];
          // Gửi yêu cầu validate đến API
          return this.userService.validateToken(token);
        })
      ).subscribe(
        (response) => {
          const newToken = response.data; // Giả sử API trả về token mới dưới dạng newToken
          console.log('new pass: ' + this.password, newToken);
          // Sử dụng token mới để gọi hàm updatePassword
          this.userService.updatePassword(this.password, newToken).subscribe(
            (data) => {
              console.log(data);
              alert('Change password successfully');
              this.router.navigate(['/login']);
            },
            (error) => {
              console.log(error);
              alert('Change password failed');
            }
          );
        },
        (error) => {
          console.log(error);
          alert('Invalid token');
        }
      );
  }
}
