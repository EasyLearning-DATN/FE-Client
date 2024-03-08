import {ResolveFn} from '@angular/router';
import {LessonService} from "../services/lesson/lesson.service";
import {inject} from "@angular/core";
import {LessonResponses} from "../responses/lesson/lesson.responses";

export const lessonResolver: ResolveFn<LessonResponses> = (route, state) => {
  const lessonService = inject(LessonService);
  return lessonService.getOneLesson(route.params['id']);
};
