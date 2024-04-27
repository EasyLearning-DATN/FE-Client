import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {ClassroomService} from '../services/classroom/classroom.service';

export const checkUserEduRoleResolver: ResolveFn<boolean> = (route, state) => {
  const classroomService = inject(ClassroomService);
  return classroomService.checkIsHaveEduRole();
};
