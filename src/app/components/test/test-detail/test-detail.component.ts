import {Component, OnInit} from '@angular/core';
import {TestResponses} from "../../../responses/test/test.responses";
import {TestService} from "../../../services/test/test.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../services/shared/shared.service";
import {v4 as uuidv4} from 'uuid';
import {CookieService} from "ngx-cookie-service";
import {TempTest} from "../../../DTOS/test/test.dto";

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css'],
})
export class TestDetailComponent implements OnInit {
  test !: TestResponses;
  isCreator: boolean = false;

  constructor(private testService: TestService, private route: ActivatedRoute, private sharedService: SharedService, private router: Router,
    private cookieService: CookieService) {

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
      const userId = userInfo ? userInfo.id : '';
      if (userId === this.test.created_by) {
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

  onDoTest() {
    const tempTestId = uuidv4();
    const tempTest: TempTest = {
      test: this.test,
      idCurrentQuestion: "",
      endTime: null,
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
}
