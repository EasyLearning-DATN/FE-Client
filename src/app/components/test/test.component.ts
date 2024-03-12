import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestListResponses, TestResponses } from 'src/app/responses/test/test.responses';
import { TestService } from 'src/app/services/test/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{
  originalTests: TestResponses[] = [];
  tests: TestResponses[] = [];
  isFetching = false;
  error = null;
  routeSub = new Subscription();
  searchKey: string = '';

  constructor(
    private testService: TestService,
  ) {

  }
  ngOnInit(): void {
    this.fetchListTest();
  }

  // get all test
  fetchListTest () {
    this.isFetching = true;
    this.testService.getAllTest().subscribe(
      (tests: TestListResponses) => {
        this.isFetching = false;
        this.originalTests = tests.data; // Lưu danh sách gốc
        this.tests = this.originalTests; // Gán danh sách gốc cho danh sách hiển thị ban đầu
        console.log(tests.data);
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      },
    );
  }

  searchTest(key : string) {
    this.isFetching = true;
    this.testService.searchTest(key).subscribe(
      (tests: TestListResponses) => {
        this.isFetching = false;
        this.tests = tests.data;
        console.log(tests.data);
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      },
    );
  }

}
