import {Component, OnInit} from '@angular/core';
import {TestListResponses, TestResponses} from "../../../responses/test/test.responses";
import {Subscription} from "rxjs";
import {TestService} from "../../../services/test/test.service";

@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.css'],
})
export class ListTestComponent implements OnInit {
  originalTests: TestResponses[] = [];
  tests: TestResponses[] = [];
  isFetching = false;
  error = null;
  routeSub = new Subscription();
  searchKey: string = '';
  currentPageIndex: number = 0;

  constructor(
    private testService: TestService,
  ) {

  }

  ngOnInit(): void {
    this.fetchListTest();
  }

  // get all test
  fetchListTest() {
    this.isFetching = true;
    this.testService.getAllTest(this.currentPageIndex).subscribe(
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

  searchTest(key: string) {
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
