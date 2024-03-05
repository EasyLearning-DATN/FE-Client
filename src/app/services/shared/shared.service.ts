import {Injectable} from '@angular/core';
import {LessonResponses} from "../../responses/lesson/lesson.responses";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  lessonChanged = new Subject<LessonResponses[]>();

  constructor() {
  }

  private _lessonsHome!: LessonResponses[];

  get lessonsHome(): LessonResponses[] {
    return this._lessonsHome;
  }

  set lessonsHome(value: LessonResponses[]) {
    this._lessonsHome = value;
  }

  private _lesson!: LessonResponses;

  get lesson(): LessonResponses {
    return this._lesson;
  }

  set lesson(value: LessonResponses) {
    this._lesson = value;
  }

  private _lessonsByUser!: LessonResponses;

  get lessonsByUser() : LessonResponses {
    return this._lessonsByUser;
  }

  set lessonsByUser(value: LessonResponses) {
    this._lessonsByUser = value;
  }
}
