import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {ClassroomService} from '../services/classroom/classroom.service';

export const checkIsClassOwnerResolver: ResolveFn<boolean> = (route, state) => {
  const classroomService = inject(ClassroomService);
  const classId = route.paramMap.get('classId');
  if (classId) {
    return classroomService.checkIsRoomOwner(classId);
  } else {
    return false;
  }

};
