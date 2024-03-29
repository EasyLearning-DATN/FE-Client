import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {SharedService} from "../../../services/shared/shared.service";
import {TempTest} from "../../../DTOS/test/test.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionTypeResponses} from "../../../responses/question-type/question-type.responses";
import {QuestionResponses} from "../../../responses/question/question.responses";
import {TestReportItemDTO} from "../../../DTOS/test-report/test-report.dto";
import {environment} from "../../../../environments/environments";
import {TestReportService} from "../../../services/test-report/test-report.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmModalComponent} from "../../commons/confirm-modal/confirm-modal.component";
import {lastValueFrom} from "rxjs";
import Swal from "sweetalert2";
import {CookieService} from "ngx-cookie-service";

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
  closeResult: string = "";
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
  currentQuestionUserAnswer: string[] | null | undefined = [];
  protected readonly environment = environment;
  // currentQuestion!: QuestionResponses;
  private clockInterval!: number;
  private isEndTestManually: boolean = false;

  constructor(private renderer2: Renderer2, private sharedService: SharedService, private route: ActivatedRoute,
    private testReportService: TestReportService, private modalService: NgbModal, private router: Router, private cookieService: CookieService) {

  }

  get reportItems() {
    return (<TestReportItemDTO[]>this.sharedService.tempTestReport.report_items);
  }

  ngOnInit() {
    this.getTempTest();
    this.getTiming();
  }

  ngAfterViewInit() {
    let totalSeconds = Math.floor((this.targetTime - this.date.getTime()) / 1000);
    this.clockInterval = window.setInterval(() => {
      totalSeconds--;
      // console.log(totalSeconds);
      this.setTiming(totalSeconds);
      if (totalSeconds === 0) {
        this.stopTimer();
      }
    }, 1000);

  }

  ngOnDestroy() {
    if (!this.isEndTestManually) {
      this.stopTimer();
    }
    clearInterval(this.clockInterval);
    this.sharedService.doTest = new TempTest();
    this.sharedService.isDoTest.next(false);
    localStorage.removeItem(this.route.snapshot.params['doTestId']);
    this.cookieService.delete(this.route.snapshot.params['doTestId']);
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
    this.onEndTest().then();
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
    if (this.currentQuestionIndex > 0) {
      this.changeCurrentQuestion(this.currentQuestionIndex - 1);
    }

  }

  toNextQuestion() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.changeCurrentQuestion(this.currentQuestionIndex + 1);
    }
    // this.sharedService.saveQuestions(,this.route.snapshot.params['doTestId']);
  }

  changeCurrentQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.currentQuestionType = <QuestionTypeResponses>this.questionTypes.find(item =>
      item.id === (<QuestionResponses[]>this.doTest.test?.question_tests)[this.currentQuestionIndex].question_type_id);
    this.currentQuestionUserAnswer = (<TestReportItemDTO[]>this.sharedService.tempTestReport.report_items)[index].answers;
    this.sharedService.saveQuestions(this.route.snapshot.params['doTestId'], undefined, this.currentQuestionIndex);
    const emitData = {
      typeCode: this.currentQuestionType,
      userAnswers: this.currentQuestionUserAnswer,
    };
    this.sharedService.nextQuestion.next(emitData);
  }

  openConfirmEndTest() {
    const modalConfirm = this.modalService.open(ConfirmModalComponent);
    modalConfirm.componentInstance.title = "Kết thúc";
    modalConfirm.componentInstance.body = "Bạn có chắc chắn muốn kết thúc bài thi không?";
    modalConfirm
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
          this.isEndTestManually = true;
          this.stopTimer();
          console.log(result);
        }

      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );

  }

  private async onEndTest() {
    this.sharedService.tempTestReport.report_items.map(
      res => {
        if (!res.answers) {
          res.answers = [];
        }
        return res;
      },
    );
    const testReport$ = this.testReportService.createTestReport(this.sharedService.tempTestReport);
    Swal.fire({
      title: 'Đang tính toán kết quả...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    await lastValueFrom(testReport$).then(res => {

      Swal.close();
      clearInterval(this.clockInterval);
      Swal.fire({
        icon: 'success',
        title: 'Tính kết quả thành công! Đang chuyển hướng',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.router.navigate(["test-report", res.id]).then(
        () => {
          Swal.close();
        },
      );
      return res;
    }).catch(reason => {
      Swal.close();
      console.log(reason);
      Swal.fire({
        icon: 'error',
        title: 'Tính toán kết quả thất bại!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    });
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
