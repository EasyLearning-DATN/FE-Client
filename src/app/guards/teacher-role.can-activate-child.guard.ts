import {CanActivateChildFn} from '@angular/router';
import {teacherRoleCanActivateGuard} from './teacher-role.can-activate.guard';

export const teacherRoleCanActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  return teacherRoleCanActivateGuard(childRoute, state);
};
