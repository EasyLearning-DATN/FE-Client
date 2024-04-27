import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassroomResponses } from 'src/app/responses/classroom/classroom.responses';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
})
export class ClassListComponent implements OnInit {
  token: string = '';
  currentPage = 0;
  classRoomPerPage = 10;
  totalPages = 0;
  totalPageArray: number[] = [];
  originalClassRoom: ClassroomResponses[] = [];
  classrooms: ClassroomResponses[] = [];
  isFetching = false;
  error = null;
  routeSub = new Subscription();
  searchKey: string = '';

  constructor(
    private classRoomService: ClassroomService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.fetchListClassroom();
    this.inviteStudent();
  }

  // get all test
  fetchListClassroom() {
    this.isFetching = true;
    this.classRoomService.getAllClassroom().subscribe(
      (classrooms: any) => {
        this.isFetching = false;
        this.totalPages = classrooms.data.totalPage; // Tổng số trang
        this.calculateTotalPageArray();
        this.originalClassRoom = classrooms.data.data; // Lưu danh sách gốc
        this.classrooms = this.originalClassRoom; // Gán danh sách gốc cho danh sách hiển thị ban đầu
        console.log(classrooms.data.totalPage);
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      },
    );
  }

  calculateTotalPageArray(): void {
    this.totalPageArray = [];
    for (let i = 0; i <= this.totalPages; i++) {
      this.totalPageArray.push(i);
    }
    this.totalPageArray.pop();
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchListClassroom();
  }

  // searchTest(key: string) {
  //   this.isFetching = true;
  //   this.testService.searchTest(key).subscribe(
  //     (tests: TestListResponses) => {
  //       this.isFetching = false;
  //       this.tests = tests.data;
  //       console.log(tests.data);
  //     },
  //     error => {
  //       this.isFetching = false;
  //       this.error = error.message;
  //     },
  //   );
  // }

  // lấy token từ url http://localhost:4200/classroom/invite?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudWxsIiwiaWF0IjoxNzEyOTc5NTkwLCJleHAiOjE3MTQ3Nzk1OTB9.6v_WZo55jz9A4BGzeU7djm0-uUfSuNQImoVKyvVDUg0
  // nếu có token thì hàm mới chạy
  inviteStudent() {
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
      if (this.token) {
        this.classRoomService.joinClassroom(this.token).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Thành công',
              text: data.data,
            });
          },
          error => {
            this.isFetching = false;
            this.error = error.message;
          },
        );
      }
    });
  }
}
