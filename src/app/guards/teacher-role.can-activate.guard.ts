import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {TRANSLATE} from '../../environments/environments';
import {RoleResponse} from '../responses/role/role.response';
import {UserResponse} from '../responses/user/user.responses';
import {UserService} from '../services/user/user-service.service';

export const teacherRoleCanActivateGuard: CanActivateFn = (route, state) => {
  const user: string | null = localStorage.getItem('userInfo');
  const router = inject(Router);
  const userService = inject(UserService);
  const translate = inject(TranslateService);
  if (!user) {
    return router.createUrlTree(['/login']);
  } else {
    const userInfo: UserResponse = JSON.parse(user);
    let roles: RoleResponse[];
    userService.getRoleUser(userInfo.id).subscribe(
      res => {
        let isEduAcc = false;
        roles = res.data;
        if (roles && roles.length > 0) {
          roles.forEach(role => {
            console.log(role);
            if (role.role==='ROLE_EDU') {
              isEduAcc = true;
            }
          });
          console.log(isEduAcc);
          if (isEduAcc) {
            return isEduAcc;
          } else {
            let title = '';
            translate.stream(TRANSLATE.MESSAGE.ERROR.ACCESS_TEACHING_001).subscribe(
              res => {
                title = res;
              },
            );
            Swal.fire({
              icon: 'error',
              title: title,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
            return router.createUrlTree(['/upgrade']);
          }
        } else {
          return router.createUrlTree(['/upgrade']);
        }
      }, error => {
        console.log(error);
        return router.createUrlTree(['/upgrade']);
      },
    );
    return true;
  }
};
