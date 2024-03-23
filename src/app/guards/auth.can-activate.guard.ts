import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authCanActivateGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (!token) {
    return router.createUrlTree(['/login']);
  } else {
    return true;
  }
};
