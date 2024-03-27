import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {SharedService} from "../../../services/shared/shared.service";
import {TempTest} from "../../../DTOS/test/test.dto";
import {ActivatedRoute} from "@angular/router";
import {QuestionTypeResponses} from "../../../responses/question-type/question-type.responses";
import {QuestionResponses} from "../../../responses/question/question.responses";
import {TestReportItemDTO} from "../../../DTOS/test-report/test-report.dto";
import {environment} from "../../../../environments/environments";

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.css'],
})
export class DoTestComponent implements OnInit, AfterViewInit, OnDestroy {

  name: string = "";
  doTest!: TempTest;
  questionsOfTest!: QuestionResponses[];
  totalQuestions!: number;
  testViewResultCode!: string;
  // resultTypes!: ResultTypeResponses[];
  questionTypes!: QuestionTypeResponses[];
  testReportItems: TestReportItemDTO[] = [];
  totalMinutes: number = 0;
  totalSeconds: number = 0;
  targetDate!: Date;
  targetTime: any;
  date: Date = new Date();
  isTotalTimeTest = false;
  isEachQuestionTimeTest = false;
  currentQuestionIndex: number = 0;
  currentQuestionType!: QuestionTypeResponses;
  currentQuestionUserAnswer: string[] | null = [];
  protected readonly environment = environment;
  // currentQuestion!: QuestionResponses;
  private clockInterval!: number;

  constructor(private renderer2: Renderer2, private sharedService: SharedService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getTempTest();
    this.getTiming();
  }

  ngAfterViewInit() {
    let totalSeconds = (this.targetTime - this.date.getTime()) / 1000;
    this.clockInterval = window.setInterval(() => {
      totalSeconds--;
      this.setTiming(totalSeconds);
      if (totalSeconds === 0) {
        this.stopTimer();
      }
    }, 1000);

  }

  ngOnDestroy() {
    this.stopTimer();
  }

  getTempTest() {
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem("questionTypes"));
    let tempTest = localStorage.getItem(this.route.snapshot.params['doTestId']);
    if (tempTest) {
      this.doTest = <TempTest>JSON.parse(tempTest);
      this.sharedService.tempTestChanged.subscribe(
        res => {
          this.doTest = res;
        },
      );
      this.name = this.sharedService.testOfDoTest.name;
      this.questionsOfTest = <QuestionResponses[]>this.sharedService.testOfDoTest.question_tests;
      this.totalQuestions = <number>this.sharedService.testOfDoTest.total_question;
      this.testViewResultCode = this.sharedService.testOfDoTest.view_result_type_id.code;
      this.changeCurrentQuestion(this.doTest.indexCurrentQuestion);
      if (!this.sharedService.tempTestReport.report_items) {
        this.sharedService.tempTestReport.report_items = this.testReportItems;
      }
    }

  }

  getTiming() {
    if (this.doTest.endTime) {
      if (this.doTest.test?.time_question) {
        this.isEachQuestionTimeTest = true;
      }
      if (this.doTest.test?.time_total) {
        this.isTotalTimeTest = true;
      }
      this.targetDate = this.doTest.endTime;
      this.targetTime = new Date(this.targetDate).getTime();
    }
  }

  stopTimer() {
    clearInterval(this.clockInterval);
  }

  setTiming(totalSeconds: number) {
    if (this.doTest.test?.time_total) {
      this.totalSeconds = Math.floor(totalSeconds % 60);
      this.totalMinutes = Math.floor(totalSeconds / 60);
    }
    if (this.doTest.test?.time_question) {
      // const totalTime = this.doTest.test?.time_question * this.doTest.test?.total_question;
      // const questionIdx = (totalTime - totalSeconds) / this.doTest.test?.time_question;
      // console.log(questionIdx);
      // this.totalSeconds = Math.floor(totalSeconds % 60);
      // this.totalMinutes = Math.floor(totalSeconds / 60);
    }
  }

  toPrevQuestion() {
    this.changeCurrentQuestion(this.currentQuestionIndex - 1);
  }

  toNextQuestion() {
    this.changeCurrentQuestion(this.currentQuestionIndex + 1);
    // this.sharedService.saveQuestions(,this.route.snapshot.params['doTestId']);
  }

  changeCurrentQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.currentQuestionType = <QuestionTypeResponses>this.questionTypes.find(item =>
      item.id === (<QuestionResponses[]>this.doTest.test?.question_tests)[this.currentQuestionIndex].question_type_id);
    this.currentQuestionUserAnswer = (<TestReportItemDTO[]>this.sharedService.tempTestReport.report_items)[index].answers;
    this.sharedService.saveQuestions(this.route.snapshot.params['doTestId'], undefined, this.currentQuestionIndex);
  }
}
