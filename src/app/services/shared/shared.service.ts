import {Injectable} from '@angular/core';
import {LessonResponses} from "../../responses/lesson/lesson.responses";
import {Subject} from "rxjs";
import {QuestionTypeResponses} from "../../responses/question-type/question-type.responses";
import {QuestionResponses} from "../../responses/question/question.responses";
import {TestResponses} from 'src/app/responses/test/test.responses';
import {ResultTypeResponses} from "../../responses/result_type_id/result_type.responses";

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  lessonsChanged = new Subject<LessonResponses[]>();
  lessonChanged = new Subject<LessonResponses>();

  constructor() {
  }

  private _tempTestQuestions!: QuestionResponses[];

  get tempTestQuestions(): QuestionResponses[] {
    return this._tempTestQuestions;
  }

  set tempTestQuestions(value: QuestionResponses[]) {
    this._tempTestQuestions = value;
  }

  private _resultType!: ResultTypeResponses[];

  get resultType(): ResultTypeResponses[] {
    return this._resultType;
  }

  set resultType(value: ResultTypeResponses[]) {
    this._resultType = value;
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
