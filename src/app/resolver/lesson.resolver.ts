import {ResolveFn} from '@angular/router';
import {LessonService} from "../services/lesson/lesson.service";
import {inject} from "@angular/core";
import {LessonResponses} from "../responses/lesson/lesson.responses";
import {SharedService} from "../services/shared/shared.service";

export const lessonResolver: ResolveFn<LessonResponses> = (route, state) => {
  const lessonService = inject(LessonService);
  const sharedService = inject(SharedService);
  const lesson = sharedService.lesson;
  if (lesson === undefined || lesson.id !== <string>route.params['id']) {
    console.log("Hello");
    return lessonService.getOneLesson(route.params['id']);
  } else {
    return lesson;
  }

};
