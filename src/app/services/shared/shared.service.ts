import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {ExamResultResponses} from 'src/app/responses/ExamResult/examresult.responses';
import {TestResponses} from 'src/app/responses/test/test.responses';
import {TestReportDTO, TestReportItemDTO} from '../../DTOS/test-report/test-report.dto';
import {TempTest} from '../../DTOS/test/test.dto';
import {ClassroomResponses} from '../../responses/classroom/classroom.responses';
import {LessonResponses} from '../../responses/lesson/lesson.responses';
import {QuestionTypeResponses} from '../../responses/question-type/question-type.responses';
import {QuestionResponses} from '../../responses/question/question.responses';
import {ResultTypeResponses} from '../../responses/result_type_id/result_type.responses';
import {SearchLessonResponses} from '../../responses/search-lesson/search-lesson.responses';
import {TestReportResponse} from '../../responses/test-report/test-report.responses';
import {UserInfoResponse, UserResponse} from '../../responses/user/user.responses';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  lessonsChanged = new Subject<LessonResponses[]>();
  lessonChanged = new Subject<LessonResponses>();
  testChanged = new Subject<TestResponses>();
  questionsOfTestChanged = new Subject<QuestionResponses[]>();
  tempTestChanged = new Subject<TempTest>();
  isFetching: Subject<boolean> = new Subject<boolean>();
  userInfoChanged = new Subject<UserResponse>();
  commentReplyChanged = new BehaviorSubject<any[]>([]);
  classroomChanged = new Subject<ClassroomResponses>();
  nextQuestion: Subject<any> = new Subject<any>();
  isDoTest: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  private _auth!: UserResponse;

  get auth(): UserResponse {
    return this._auth;
  }

  set auth(value: UserResponse) {
    this._auth = value;
  }

  private _classroom!: ClassroomResponses;

  get classroom(): ClassroomResponses {
    return this._classroom;
  }

  set classroom(value: ClassroomResponses) {
    this._classroom = value;
  }

  private _testReport!: TestReportResponse;

  get testReport(): TestReportResponse {
    return this._testReport;
  }

  set testReport(value: TestReportResponse) {
    this._testReport = value;
  }

  private _examResult!: ExamResultResponses;

  get examResult(): ExamResultResponses {
    return this._examResult;
  }

  set examResult(value: ExamResultResponses) {
    this._examResult = value;
  }

  private _doTest!: TempTest;
  get doTest(): TempTest {
    return this._doTest;
  }

  set doTest(value: TempTest) {
    this._doTest = value;
    this.tempTestChanged.next(this._doTest);
  }

  get tempTestReport() {
    return (<TestReportDTO>this.doTest.test_report);
  }

  get testOfDoTest() {
    return (<TestResponses>this.doTest.test);
  }

  private _test !: TestResponses;

  get test(): TestResponses {
    return this._test;
  }

  set test(value: TestResponses) {
    this._test = value;
  }

  private _lessonViewInfo!: LessonResponses;

  get lessonViewInfo(): LessonResponses {
    return this._lessonViewInfo;
  }

  set lessonViewInfo(value: LessonResponses) {
    this._lessonViewInfo = value;
  }

  private _questionsOfCreatingTest!: QuestionResponses[];

  get questionsOfCreatingTest(): QuestionResponses[] {
    return this._questionsOfCreatingTest.slice();
  }

  set questionsOfCreatingTest(value: QuestionResponses[]) {
    this._questionsOfCreatingTest = value;
    this.questionsOfTestChanged.next(this.questionsOfCreatingTest);
  }

  private _creatingTest!: TestResponses;

  get creatingTest(): TestResponses {
    return this._creatingTest;
  }

  set creatingTest(value: TestResponses) {
    this._creatingTest = value;
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

  private _lessonsSearch!: SearchLessonResponses[];

  get lessonsSearch(): SearchLessonResponses[] {
    return this._lessonsSearch;
  }

  set lessonsSearch(value: SearchLessonResponses[]) {
    this._lessonsSearch = value;
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

  private _lessonsHome!: SearchLessonResponses[];

  get lessonsHome(): SearchLessonResponses[] {
    return this._lessonsHome;
  }

  set lessonsHome(value: SearchLessonResponses[]) {
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

  private _testsHome!: TestResponses[];

  get testsHome(): TestResponses[] {
    return this._testsHome;
  }

  set testsHome(value: TestResponses[]) {
    this._testsHome = value;
  }

  private _user!: UserInfoResponse;

  get user(): UserInfoResponse {
    return this._user;
  }

  set user(value: UserInfoResponse) {
    this._user = value;
  }

  checkLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token;
  }

  onAddQuestionsOfTest(questions: QuestionResponses[]) {
    if (this._questionsOfCreatingTest===undefined) {
      this.questionsOfCreatingTest = questions;
    } else {
      let filterQuestions = questions.filter(
        response => {
          if (!this._questionsOfCreatingTest.includes(response)) {
            return response;
          } else {
            return false;
          }
        },
      );
      this._questionsOfCreatingTest.push(...filterQuestions);
      // this._questionsOfCreatingTest.push(...questions);
      this.questionsOfTestChanged.next(this.questionsOfCreatingTest);
    }
  }

  onRemoveQuestionOfTest(index: number) {
    this._questionsOfCreatingTest.splice(index, 1);
    console.log(this._questionsOfCreatingTest);
    this.questionsOfTestChanged.next(this.questionsOfCreatingTest);
  }

  onUpdateLessonsSearch(newLessons: SearchLessonResponses[]) {
    this.lessonsSearch.push(...newLessons);
  }

  saveQuestions(tempTestId: string, item?: TestReportItemDTO, indexCurrentQuestion?: number, score?: number) {
    if (this.tempTestReport.report_items && item!==undefined) {
      const reportItemIndex = this.tempTestReport.report_items.findIndex(i => i.question_id===item.question_id);
      if (reportItemIndex!== -1) {
        this.tempTestReport.report_items[reportItemIndex] = item;
      } else {
        this.tempTestReport.report_items.push(item);
      }
    }
    if (indexCurrentQuestion!==undefined) {
      this._doTest.indexCurrentQuestion = indexCurrentQuestion;
    }
    if (score!==undefined) {
      this.tempTestReport.total_point += score;
    }
    localStorage.setItem(tempTestId, JSON.stringify(this._doTest));
    // this.cookieService
    this.tempTestChanged.next(this._doTest);
  }


}
