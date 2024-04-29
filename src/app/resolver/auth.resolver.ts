import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {UserResponse} from '../responses/user/user.responses';
import {UserService} from '../services/user/user-service.service';

export const authResolver: ResolveFn<UserResponse> = (route, state) => {
  const userService = inject(UserService);
  return userService.getUserInfo('no need');

};
