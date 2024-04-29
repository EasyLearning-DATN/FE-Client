import {ResolveFn} from '@angular/router';
import {UserService} from "../services/user/user-service.service";
import {inject} from "@angular/core";
import {UserInfoResponse} from "../responses/user/user.responses";
import {SharedService} from "../services/shared/shared.service";

export const userResolver: ResolveFn<UserInfoResponse> = (route, state) => {
  const userService = inject(UserService);
  const sharedService = inject(SharedService);
  const user = sharedService.user;
  if (user === undefined || user.username !== <string>route.params['username']) {
    return userService.getOneUser(route.params['username']);
  } else {
    return user;
  }
};