import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TestReportResponse} from '../../../responses/test-report/test-report.responses';
import {SharedService} from '../../../services/shared/shared.service';

@Component({
  selector: 'app-test-report-detail',
  templateUrl: './test-report-detail.component.html',
  styleUrls: ['./test-report-detail.component.css'],
})
export class TestReportDetailComponent implements OnInit, AfterContentInit, OnDestroy {

  testReport!: TestReportResponse;
  classRoomId: null | string = null;
  protected readonly Math = Math;
  private userInfoId!: number;


  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.classRoomId = this.route.snapshot.paramMap.get('classId');

    this.testReport = this.sharedService.testReport;

    // truyển userInfo từ localStorage và lấy userInfoId
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
    this.userInfoId = userInfo ? userInfo.userInfoId: -1;
    if (this.userInfoId!==this.testReport.user_info.id) {
      this.router.navigate(['404']).then();
    }

  }

  ngAfterContentInit() {

  }

  ngOnDestroy() {

  }
}

