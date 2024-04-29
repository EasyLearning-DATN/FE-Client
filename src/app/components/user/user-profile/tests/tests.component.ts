import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TestListResponses, TestResponses} from "../../../../responses/test/test.responses";
import {TestService} from "../../../../services/test/test.service";
import {UserInfoResponse, UserResponse} from 'src/app/responses/user/user.responses';
import {UserService} from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';
import {SharedService} from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  user !: UserInfoResponse;
  langForm = new FormGroup({
    lang: new FormControl('vi'),
  });
  lang!: string;
  
  currentPage = 0;
  testsPerPage = 10;
  totalPages = 0;
  totalPageArray: number[] = [];
  originalTests: TestResponses[] = [];
  tests: TestResponses[] = [];
  error = null;
  searchKey: string = '';

  constructor(
    private userService: UserService, private sharedService: SharedService, private testService: TestService,
  ) {

  }

  ngOnInit(): void {
    this.user = this.sharedService.user;
    this.fetchTests(this.searchKey);
  }

  // get all test
  fetchTests(key : string) {
    // get test by user Id
    const userId = this.user.username || '';
    this.searchKey = key;
    this.testService.getListTestByUsername(this.searchKey, this.currentPage, userId).subscribe(
      (tests: any) => {
        this.totalPages = tests.totalPage; // Tổng số trang
        this.calculateTotalPageArray();
        this.originalTests = tests.data; // Lưu danh sách gốc
        this.tests = this.originalTests; // Gán danh sách gốc cho danh sách hiển thị ban đầu
      },
      error => {
        this.error = error.message;
      },
    );
  }

  calculateTotalPageArray(): void {
    this.totalPageArray = [];
    for (let i = 0; i <= this.totalPages;i++) {
      this.totalPageArray.push(i);
    }
    this.totalPageArray.pop();
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchTests(this.searchKey);
  }
}
