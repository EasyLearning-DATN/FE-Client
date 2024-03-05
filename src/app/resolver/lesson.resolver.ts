import {ResolveFn} from '@angular/router';
import {SharedService} from "../services/shared/shared.service";
import {LessonService} from "../services/lesson/lesson.service";
import {inject} from "@angular/core";
import {LessonResponses} from "../responses/lesson/lesson.responses";

export const lessonResolver: ResolveFn<LessonResponses> = (route, state) => {
  const sharedService = inject(SharedService);
  const lessonService = inject(LessonService);
  const lesson = sharedService.lesson;
  if (lesson === undefined) {
    return lessonService.getOneLesson(route.params['id']);
  } else {
    return lesson;
  }
};
