import {CanActivateChildFn} from '@angular/router';
import {authCanActivateGuard} from "./auth.can-activate.guard";

export const authCanActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  return authCanActivateGuard(childRoute, state);
};
