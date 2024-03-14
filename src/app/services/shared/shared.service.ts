import {Injectable} from '@angular/core';
import {LessonResponses} from "../../responses/lesson/lesson.responses";
import {Subject} from "rxjs";
import {QuestionTypeResponses} from "../../responses/question-type/question-type.responses";
import {QuestionListResponses} from "../../responses/question/question.responses";
import { TestListResponses, TestResponses } from 'src/app/responses/test/test.responses';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  lessonsChanged = new Subject<LessonResponses[]>();
  lessonChanged = new Subject<LessonResponses>();
  questionsOfLessonChanged = new Subject<QuestionListResponses>();

  constructor() {
  }

  private _questionsOfLesson!: QuestionListResponses;

  get questionsOfLesson(): QuestionListResponses {
    return this._questionsOfLesson;
  }

  set questionsOfLesson(value: QuestionListResponses) {
    this._questionsOfLesson = value;
  }

  private _questionTypeResponses!: QuestionTypeResponses[];

  get questionTypeResponses(): QuestionTypeResponses[] {
    return this._questionTypeResponses;
  }

  set questionTypeResponses(value: QuestionTypeResponses[]) {
    this._questionTypeResponses = value;
  }

  private _allLessons!: LessonResponses[];

  get allLessons(): LessonResponses[] {
    return this._allLessons;
  }

  set allLessons(value: LessonResponses[]) {
    this._allLessons = value;
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

  private _lessonsByUser!: LessonResponses[];

  get lessonsByUser(): LessonResponses[] {
    return this._lessonsByUser;
  }

  set lessonsByUser(value: LessonResponses[]) {
    this._lessonsByUser = value;
  }

  private _allTest!: TestResponses[];

  get allTest(): TestResponses[] {
    return this._allTest;
  }

  set allTest(value: TestResponses[]) {
    this._allTest = value;
  }

   checkLogin() {
    let jsonData = localStorage.getItem('token');
    if (jsonData) {
      return JSON.parse(jsonData);
    } else {
      return false;
    }
  }

}
