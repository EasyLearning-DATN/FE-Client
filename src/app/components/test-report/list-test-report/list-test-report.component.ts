import { Component, OnInit } from '@angular/core';
import { TestReportResponse } from 'src/app/responses/test-report/test-report.responses';
import { UserResponse } from 'src/app/responses/user/user.responses';
import { TestReportService } from 'src/app/services/test-report/test-report.service';

@Component({
  selector: 'app-list-test-report',
  templateUrl: './list-test-report.component.html',
  styleUrls: ['./list-test-report.component.css']
})
export class ListTestReportComponent implements OnInit{
  searchKey: string = '';
  testReports: TestReportResponse[] = [];
  userId = JSON.parse(localStorage.getItem('userInfo') || '{}').id || null;
  constructor (
    private testReportService: TestReportService
  ) {}

  ngOnInit(): void {
    this.getAllListTestReportByUserID();
  }

  getAllListTestReportByUserID() {
    this.testReportService.getAllTestReportByUserID(this.userId).subscribe(
      (res: any) => {
        this.testReports = res.data.data;
      },
      error => {
        console.log(error);
      },
    );
  }

  searchTest(searchKey : string) {

  }

}
