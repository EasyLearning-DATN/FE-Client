import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {ClassroomResponses} from '../responses/classroom/classroom.responses';
import {ClassroomService} from '../services/classroom/classroom.service';
import {SharedService} from '../services/shared/shared.service';

export const classroomResolver: ResolveFn<ClassroomResponses> = (route, state) => {
  const classroomService = inject(ClassroomService);
  const sharedService = inject(SharedService);
  const classroom = sharedService.classroom;
  if (classroom===undefined || classroom.id!==<string>route.params['classId']) {
    return classroomService.getOneClassroom(route.params['classId']);
  } else {
    return classroom;
  }
};
