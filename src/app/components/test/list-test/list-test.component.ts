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
  currentPage = 0;
  testsPerPage = 10;
  totalPages = 0;
  totalPageArray: number[] = [];
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
  fetchListTest() {
    this.isFetching = true;
    this.testService.getAllTest(this.currentPage).subscribe(
      (tests: any) => {
        this.isFetching = false;
        this.totalPages = tests.totalPage; // Tổng số trang
        this.calculateTotalPageArray();
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

  calculateTotalPageArray(): void {
    this.totalPageArray = [];
    for (let i = 0; i <= this.totalPages;i++) {
      this.totalPageArray.push(i);
    }
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchListTest();
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
