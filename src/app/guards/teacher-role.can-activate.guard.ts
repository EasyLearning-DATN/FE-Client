import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {TRANSLATE} from '../../environments/environments';
import {userResolver} from '../resolver/user.resolver';
import {UserResponse} from '../responses/user/user.responses';
import {SharedService} from '../services/shared/shared.service';

export const teacherRoleCanActivateGuard: CanActivateFn = (route, state) => {
  const user: string | null = localStorage.getItem('userInfo');
  const router = inject(Router);
  const translate = inject(TranslateService);
  const sharedService = inject(SharedService);
  userResolver(route, state);
  console.log(sharedService.auth);
  if (!user) {
    return router.createUrlTree(['/login']);
  } else {
    const userInfo: UserResponse = JSON.parse(user);
    let isEduAcc = false;
    if (userInfo.role==='edu') {
      isEduAcc = true;
    }
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
  }
};
