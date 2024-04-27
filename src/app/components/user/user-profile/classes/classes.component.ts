import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClassroomResponses } from 'src/app/responses/classroom/classroom.responses';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import Swal from 'sweetalert2';
import {UserInfoResponse, UserResponse} from 'src/app/responses/user/user.responses';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  user !: UserResponse;
  langForm = new FormGroup({
    lang: new FormControl('vi'),
  });
  lang!: string;

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
    this.user = JSON.parse(localStorage.getItem('userInfo') || '');
    this.fetchClasses(this.searchKey);
    this.inviteStudent();
  }

  // get all classes
  fetchClasses(key : string) {
    // get class by user Id
    const userId = this.user.username || '';
    this.searchKey = key;
    this.isFetching = true;
    this.classRoomService.getClasses(this.searchKey, this.currentPage, userId).subscribe(
      (classrooms: any) => {
        this.isFetching = false;
        this.totalPages = classrooms.totalPage; // Tổng số trang
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
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchClasses(this.searchKey);
  }

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
