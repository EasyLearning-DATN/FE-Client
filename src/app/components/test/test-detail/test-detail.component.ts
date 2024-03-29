import {Component, OnInit} from '@angular/core';
import {TestResponses} from "../../../responses/test/test.responses";
import {TestService} from "../../../services/test/test.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../services/shared/shared.service";
import {v4 as uuidv4} from 'uuid';
import {CookieService} from "ngx-cookie-service";
import {TempTest} from "../../../DTOS/test/test.dto";
import {TestReportItemDTO} from "../../../DTOS/test-report/test-report.dto";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmModalComponent} from "../../commons/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css'],
})
export class TestDetailComponent implements OnInit {
  test !: TestResponses;
  isCreator: boolean = false;
  userId!: string;
  userInfoId!: number;
  closeResult: string = "";

  constructor(private testService: TestService, private route: ActivatedRoute, private sharedService: SharedService, private router: Router,
    private cookieService: CookieService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.test = this.sharedService.test;
    this.sharedService.testChanged.subscribe(
      (test) => {
        this.sharedService.test = test;
        this.test = this.sharedService.test;
      },
    );

    // truyển userInfo từ localStorage và lấy id
    const userInfoString = localStorage.getItem('userInfo') || '';
    if (userInfoString === '') {
      this.isCreator = false;
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      this.userId = userInfo ? userInfo.id : '';
      this.userInfoId = userInfo ? userInfo.userInfoId : 0;
      if (this.userId === this.test.created_by) {
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
    confirmModalComponent.componentInstance.title = 'Làm bài thi';
    confirmModalComponent.componentInstance.body = 'Bạn có muốn làm bài thi này không?';
    confirmModalComponent
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
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
      test_report: {
        report_items: reportItems,
        total_point: 0,
        user_info_id: this.userInfoId,
        test_id: this.test.id,
      },
    };
    if (this.test.time_total === null) {
      localStorage.setItem(tempTestId, JSON.stringify(tempTest));
    } else if (this.test.time_question === null) {
      const endTime = new Date(new Date().getTime() + (this.test.time_total * 1000));
      tempTest.endTime = endTime;
      localStorage.setItem(tempTestId, JSON.stringify(tempTest));
      this.cookieService.set(tempTestId, "doing", endTime);
    } else {
      const endTime = new Date(new Date().getTime() + (this.test.time_question * 1000 * this.test.question_tests.length));
      tempTest.endTime = endTime;
      localStorage.setItem(tempTestId, JSON.stringify(tempTest));
      this.cookieService.set(tempTestId, "doing", endTime);
    }
    this.router.navigate(['do-test', tempTestId], {relativeTo: this.route});
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
