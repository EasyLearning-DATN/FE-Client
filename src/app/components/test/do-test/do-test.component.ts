import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {lastValueFrom} from 'rxjs';
import screenfull from 'screenfull';
import Swal from 'sweetalert2';
import {environment} from '../../../../environments/environments';
import {TestReportItemDTO} from '../../../DTOS/test-report/test-report.dto';
import {TempTest} from '../../../DTOS/test/test.dto';
import {QuestionTypeResponses} from '../../../responses/question-type/question-type.responses';
import {QuestionResponses} from '../../../responses/question/question.responses';
import {SharedService} from '../../../services/shared/shared.service';
import {TestReportService} from '../../../services/test-report/test-report.service';
import {ConfirmModalComponent} from '../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.css'],
  animations: [trigger('item', [
    transition(':enter', [
      animate('1s ease-in-out', keyframes([
        style({
          opacity: 0,
          'transform': 'translateX(-60px)',
          offset: 0,
        }),
        style({
          opacity: 0.5,
          'transform': 'translateX(-40px)',
          offset: 0.3,
        }),
        style({
          opacity: 1,
          'transform': 'translateX(-20px)',
          offset: 0.7,
        }),
        style({
          opacity: 1,
          'transform': 'translateX(0)',
          offset: 1,
        }),
      ])),
    ]),
    transition(':leave', [
      animate('0.5s ease-in-out', keyframes([
        style({
          opacity: 1,
          'transform': 'translateX(0)',
          offset: 0,
        }),
        style({
          opacity: 0.5,
          'transform': 'translateX(20px)',
          offset: 0.3,
        }),
        style({
          opacity: 0.25,
          'transform': 'translateX(40px)',
          offset: 0.7,
        }),
        style({
          opacity: 0,
          'transform': 'translateX(60px)',
          offset: 1,
        }),
      ])),
    ]),
  ])],
})
export class DoTestComponent implements OnInit, AfterViewInit, OnDestroy {

  name: string = '';
  doTest!: TempTest;
  questionsOfTest!: QuestionResponses[];
  totalQuestions!: number;
  testViewResultCode!: string;
  classRoomId: string | null = null;
  closeResult: string = '';
  canNavigate: boolean = false;
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
  totalSecondsLeft: number = 0;
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key==='Tab' ||
      event.key==='F11' ||
      event.key==='Escape') {
      event.preventDefault();
    }
  }

  // @HostListener('document:mousemove', ['$event'])
  // handleMouseMovement(event: MouseEvent) {
  //   console.log(event.screenX);
  //   if (event.screenY <= 5
  //     // || event.screenX <= 5
  //   ) {
  //     event.preventDefault();
  //     window.alert('Xin vui lòng không di chuyển chuột khỏi phạm vi bài thi!');
  //   }
  // }

  ngOnInit() {
    this.classRoomId = this.route.snapshot.paramMap.get('classId');

    this.getTempTest();
    this.getTiming();
  }

  ngAfterViewInit() {
    this.totalSecondsLeft = Math.floor((this.targetTime - this.date.getTime()) / 1000);
    this.clockInterval = window.setInterval(() => {
      this.totalSecondsLeft--;
      this.setTiming(this.totalSecondsLeft);
      if (this.totalSecondsLeft===0) {
        this.stopTimer();
      }
    }, 1000);

  }

  ngOnDestroy() {
    // if (!this.isEndTestManually) {
    //   this.stopTimer();
    // }
    clearInterval(this.clockInterval);
    this.sharedService.doTest = new TempTest();
    this.sharedService.isDoTest.next(false);
    localStorage.removeItem(this.route.snapshot.params['doTestId']);
    this.cookieService.delete(this.route.snapshot.params['doTestId']);
  }

  getTempTest() {
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem('questionTypes'));
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
    this.canNavigate = true;
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
      item.id===(<QuestionResponses[]>this.doTest.test?.question_tests)[this.currentQuestionIndex].question_type_id);
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
    modalConfirm.componentInstance.title = {value: 'Kết thúc'};
    modalConfirm.componentInstance.body = {value: 'Bạn có chắc chắn muốn kết thúc bài thi không?'};
    modalConfirm
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result==='Confirm') {
          this.isEndTestManually = true;
          this.canNavigate = true;
          this.stopTimer();
          console.log(result);
        }
        if (result==='Reject') {
          this.canNavigate = false;
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.canNavigate = false;
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
    const startTime = new Date(this.sharedService.doTest.startTime ? this.sharedService.doTest.startTime: 0);
    this.sharedService.tempTestReport.total_time_finish = (new Date().getTime() - startTime.getTime()) / 1000;

    console.log(this.sharedService.tempTestReport);
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
      if (this.classRoomId) {
        this.router.navigate(['../../../test-report', res.id], {relativeTo: this.route}).then(
          () => {
            Swal.close();
            if (screenfull.isEnabled) {
              screenfull.toggle();
            }
          },
        );
      } else {
        this.router.navigate(['/test/test-report', res.id]).then(
          () => {
            Swal.close();
            if (screenfull.isEnabled) {
              screenfull.toggle();
            }
          },
        );
      }
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
