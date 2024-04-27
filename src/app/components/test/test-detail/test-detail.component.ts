import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CookieService} from 'ngx-cookie-service';
import screenfull from 'screenfull';
import {ExamResultResponses} from 'src/app/responses/ExamResult/examresult.responses';
import {ExamResultService} from 'src/app/services/test/ExamResult/exam-result.service';
import Swal from 'sweetalert2';
import {v4 as uuidv4} from 'uuid';
import {TestReportItemDTO} from '../../../DTOS/test-report/test-report.dto';
import {TempTest} from '../../../DTOS/test/test.dto';
import {TestResponses} from '../../../responses/test/test.responses';
import {SharedService} from '../../../services/shared/shared.service';
import {TestService} from '../../../services/test/test.service';
import {ConfirmModalComponent} from '../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css'],
})
export class TestDetailComponent implements OnInit {
  test !: TestResponses;
  isCreator: boolean = false;
  userId!: string;
  classRoomId: string | null = null;
  userInfoId!: number;
  closeResult: string = '';

  constructor(private testService: TestService, private route: ActivatedRoute, private sharedService: SharedService, private router: Router,
              private cookieService: CookieService, private modalService: NgbModal, private examResultService: ExamResultService) {

  }

  private get _checkOpenAndCloseTime() {
    let data = {
      isOpened: false,
      isClosed: false,
      timeLeft: -1,
      openTime: new Date(),
      closeTime: new Date(),
    };
    if (this.test.open_time) {
      data.openTime = new Date(this.test.open_time);
      if (new Date().getTime() >= new Date(data.openTime).getTime()) {
        data.isOpened = true;
      }
    } else {
      data.isOpened = true;
    }
    if (this.test.close_time) {
      data.closeTime = new Date(this.test.close_time);
      if (new Date().getTime() >= new Date(data.closeTime).getTime()) {
        data.isClosed = true;
      } else {
        // if (this.test.time_total) {
        //   data.timeLeft = new Date(data.closeTime).getTime() - this.test.time_total * 1000;
        // } else {
        data.timeLeft = new Date(data.closeTime).getTime() - new Date().getTime();
        // }
      }
    }
    return data;

  }

  ngOnInit() {
    this.classRoomId = this.route.snapshot.paramMap.get('classId');
    this.test = this.sharedService.test;
    this.sharedService.testChanged.subscribe(
      (test) => {
        this.sharedService.test = test;
        this.test = this.sharedService.test;
      },
    );

    // truyển userInfo từ localStorage và lấy id
    const userInfoString = localStorage.getItem('userInfo') || '';
    if (userInfoString==='') {
      this.isCreator = false;
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      this.userId = userInfo ? userInfo.id: '';
      this.userInfoId = userInfo ? userInfo.userInfoId: 0;
      if (this.userId===this.test.created_by) {
        this.isCreator = true;
      } else {
        this.isCreator = false;
      }
    }
  }

  onCopyURL() {
    // Copy đường dãn vào clipboard
    navigator.clipboard.writeText(window.location.href);
  }

  openConfirmDialog() {
    const confirmModalComponent = this.modalService.open(ConfirmModalComponent);
    confirmModalComponent.componentInstance.title = {value: 'Làm bài thi'};
    confirmModalComponent.componentInstance.body = {value: 'Bạn có muốn làm bài thi này không?'};
    confirmModalComponent
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result==='Confirm') {
          if (this.classRoomId) {
            this.testService.checkIsDoneTest(this.test.id).subscribe(
              res => {
                if (res) return;
              },
            );
          }
          this.onDoTest();
          console.log(result);
        }

      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  onDoTest() {
    const tempTestId = uuidv4();
    const reportItems: TestReportItemDTO[] = this.test.question_tests.map(value => {
      return {
        question_id: value.id,
        answers: null,
      };
    });
    const tempTest: TempTest = {
      test: this.test,
      indexCurrentQuestion: 0,
      endTime: null,
      startTime: new Date(),
      test_report: {
        report_items: reportItems,
        total_point: 0,
        user_info_id: this.userInfoId,
        test_id: this.test.id,
        total_time_finish: 0,
      },
    };
    // Nếu bài test không có thời gian làm bài
    if (this.test.time_total===null) {
      // Nếu nó vẫn còn mở và chưa đóng
      if (this._checkOpenAndCloseTime.isOpened && !this._checkOpenAndCloseTime.isClosed) {

        if (this._checkOpenAndCloseTime.timeLeft=== -1) {
          const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
          tempTest.endTime = endTime;
          localStorage.setItem(tempTestId, JSON.stringify(tempTest));
          this.cookieService.set(tempTestId, 'doing', endTime);
        } else {
          const endTime = new Date(new Date().getTime() + this._checkOpenAndCloseTime.timeLeft);
          tempTest.endTime = endTime;
          localStorage.setItem(tempTestId, JSON.stringify(tempTest));
          this.cookieService.set(tempTestId, 'doing', endTime);
        }
      } else if (this._checkOpenAndCloseTime.isClosed) {
        Swal.fire({
          icon: 'error',
          title: 'Đã hết giờ làm bài kiểm tra!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        return;
      } else if (!this._checkOpenAndCloseTime.isOpened) {
        Swal.fire({
          icon: 'error',
          title: 'Bài kiểm tra này chưa được mở!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        return;
      }
    } else if (this.test.time_question===null) {
      if (this._checkOpenAndCloseTime.isOpened && !this._checkOpenAndCloseTime.isClosed) {
        if (this._checkOpenAndCloseTime.timeLeft=== -1) {
          const endTime = new Date(new Date().getTime() + (this.test.time_total * 1000));
          tempTest.endTime = endTime;
          localStorage.setItem(tempTestId, JSON.stringify(tempTest));
          this.cookieService.set(tempTestId, 'doing', endTime);
        } else {
          if (this.test.time_total * 1000 <= this._checkOpenAndCloseTime.timeLeft) {
            const endTime = new Date(new Date().getTime() + (this.test.time_total * 1000));
            tempTest.endTime = endTime;
            localStorage.setItem(tempTestId, JSON.stringify(tempTest));
            this.cookieService.set(tempTestId, 'doing', endTime);
          } else {
            const endTime = new Date(new Date().getTime() + this._checkOpenAndCloseTime.timeLeft);
            tempTest.endTime = endTime;
            localStorage.setItem(tempTestId, JSON.stringify(tempTest));
            this.cookieService.set(tempTestId, 'doing', endTime);
          }

        }
      } else if (this._checkOpenAndCloseTime.isClosed) {
        Swal.fire({
          icon: 'error',
          title: 'Đã hết giờ làm bài kiểm tra!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        return;
      } else if (!this._checkOpenAndCloseTime.isOpened) {
        Swal.fire({
          icon: 'error',
          title: 'Bài kiểm tra này chưa được mở!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        return;
      }
    } else {
      const endTime = new Date(new Date().getTime() + (this.test.time_question * 1000 * this.test.question_tests.length));
      tempTest.endTime = endTime;
      localStorage.setItem(tempTestId, JSON.stringify(tempTest));
      this.cookieService.set(tempTestId, 'doing', endTime);
    }
    this.router.navigate(['do-test', tempTestId], {relativeTo: this.route}).then(
      () => {
        this.sharedService.isDoTest.next(true);
        if (screenfull.isEnabled) {
          screenfull.toggle();
        }
      },
    );
  }

  getExamResult(testId: string) {
    this.examResultService.getExamResult(testId).subscribe(
      (res: ExamResultResponses) => {
        console.log(res);
      }, error => {
        console.log(error.message);
      },
    );
  }

  private convertToGMT7(date: Date, time: number): Date {
    // Create a new Date object with the same time in UTC
    let thisDate = new Date(date);

    // Adjust the time for GMT+7 timezone (add 7 hours)
    thisDate.setHours(thisDate.getHours() + time);

    return thisDate;
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
