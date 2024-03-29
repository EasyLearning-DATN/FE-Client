import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {TestReportResponse} from "../../responses/test-report/test-report.responses";
import {SharedService} from "../../services/shared/shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css'],
})
export class TestReportComponent implements OnInit, AfterContentInit, OnDestroy {

  testReport!: TestReportResponse;
  private userInfoId!: number;

  constructor(private sharedService: SharedService, private router: Router) {
  }

  ngOnInit() {
    this.testReport = this.sharedService.testReport;

    // truyển userInfo từ localStorage và lấy userInfoId
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    this.userInfoId = userInfo ? userInfo.userInfoId : -1;
    if (this.userInfoId !== this.testReport.user_info.userInfoId) {
      this.router.navigate(['404']).then();
    }

  }

  ngAfterContentInit() {

  }

  ngOnDestroy() {

  }


}
