import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {SharedService} from '../services/shared/shared.service';
import {UserService} from '../services/user/user-service.service';

export const roleResolver: ResolveFn<boolean> = (route, state) => {
  const sharedService = inject(SharedService);
  const userService = inject(UserService);
  const auth = sharedService.auth;
  return userService.getRoleUser(auth.id);
};
