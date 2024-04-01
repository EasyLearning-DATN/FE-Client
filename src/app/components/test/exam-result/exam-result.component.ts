import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamResultResponses } from 'src/app/responses/ExamResult/examresult.responses';
import { TestResponses } from 'src/app/responses/test/test.responses';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { ExamResultService } from 'src/app/services/test/ExamResult/exam-result.service';
import { TestService } from 'src/app/services/test/test.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent {
  testId: string | undefined;
  test: any;
  examResult: any;
  examDetail: ExamResultResponses[] | undefined;

  constructor(
    private testService: TestService,
    private sharedService: SharedService,
    private excelService: ExcelService,
    private examResultService: ExamResultService,
    private route: ActivatedRoute
  ) {

  }

  // lấy test id ở http://localhost:4200/test/ExamResult/e8d64231-65c3-4949-91a2-7a8e029bbbe6

  ngOnInit() {
    this.getTestDetail();
    const currentUrl = this.route.snapshot.url.join('/');
    const urlParts = currentUrl.split('/');
    this.testId = urlParts[urlParts.length - 1];
    if (this.testId) {
      this.examResultService.getExamResult(this.testId).subscribe(
        (res: any) => {
          this.examResult = res;
          console.log(this.examResult);
        }
      );
    }
  }

  getTestDetail() {
    const currentUrl = this.route.snapshot.url.join('/');
    const urlParts = currentUrl.split('/');
    this.testId = urlParts[urlParts.length - 1];
    this.testService.getOneTest(this.testId).subscribe(
      (res: any) => {
        this.test = res;
        console.log(this.test);
      }
    );
  }

  exportExcel(): void {
    const dataToExport = [];
    const table = document.getElementById('examTable');
    if (table) {
        const rows = table.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const rowData = {
                'Họ và Tên': row.cells[1].textContent, 
                'Thời gian vào bài': row.cells[2].textContent,
                'Thời gian hoàn thành': row.cells[3].textContent, 
                'Số câu đúng': row.cells[4].textContent, 
                'Điểm': row.cells[5].textContent
            };
            dataToExport.push(rowData);
        }
    }
    this.excelService.exportToExcel(dataToExport, this.test?.name + '_Kết quả');
}


  convertTime(timeInSeconds: number): string {
    if (timeInSeconds < 60) {
      return `${timeInSeconds} giây`;
    } else {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes} phút ${seconds} giây`;
    }
  }


}
