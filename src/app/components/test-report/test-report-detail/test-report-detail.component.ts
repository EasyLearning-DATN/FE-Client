import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {TestReportResponse} from '../../../responses/test-report/test-report.responses';
import {SharedService} from '../../../services/shared/shared.service';

@Component({
  selector: 'app-test-report-detail',
  templateUrl: './test-report-detail.component.html',
  styleUrls: ['./test-report-detail.component.css'],
})
export class TestReportDetailComponent implements OnInit, AfterContentInit, OnDestroy {

  testReport!: TestReportResponse;
  testId!: string | null;
  classRoomId: null | string = null;
  testReportsClassMember !: TestReportResponse[];
  protected readonly Math = Math;
  private userInfoId!: number;


  constructor(private sharedService: SharedService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.classRoomId = this.route.snapshot.paramMap.get('classId');

    if (this.classRoomId) {
      this.testId = this.route.snapshot.paramMap.get('id');
      this.testReportsClassMember = this.sharedService.testReportClassMember;
      if (this.testReportsClassMember===undefined || this.testReportsClassMember.length===0) {
        Swal.fire({
          icon: 'error',
          title: 'Bạn chưa làm bài kiểm tra này!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(
          res => {
            if (res.isConfirmed) {
              this.router.navigate(['../'], {relativeTo: this.route});
            }
          },
        );
      } else {
        const testReports = this.testReportsClassMember;
        if (testReports.length >= 1) {
          const testReport = this.testReportsClassMember.at(0);
          if (testReport) {
            this.testReport = testReport;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Bạn chưa làm bài kiểm tra này!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then(
              res => {
                if (res.isConfirmed) {
                  this.router.navigate(['../'], {relativeTo: this.route});
                }
              },
            );
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Bạn chưa làm bài kiểm tra này!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(
            res => {
              if (res.isConfirmed) {
                this.router.navigate(['../'], {relativeTo: this.route});
              }
            },
          );

        }
      }
    } else {
      this.testReport = this.sharedService.testReport;
    }

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

