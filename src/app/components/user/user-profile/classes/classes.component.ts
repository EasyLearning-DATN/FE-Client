import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClassroomResponses } from 'src/app/responses/classroom/classroom.responses';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import Swal from 'sweetalert2';
import {UserInfoResponse, UserResponse} from 'src/app/responses/user/user.responses';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  user !: UserInfoResponse;
  langForm = new FormGroup({
    lang: new FormControl('vi'),
  });
  lang!: string;

  token: string = '';
  currentPage = 0;
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
    private sharedService: SharedService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    // this.user = JSON.parse(localStorage.getItem('userInfo') || '');
    this.user = this.sharedService.user;
    this.fetchClasses(this.searchKey);
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
        this.totalPages = classrooms.data.totalPage; // Tổng số trang
        this.calculateTotalPageArray();
        this.originalClassRoom = classrooms.data.data; // Lưu danh sách gốc
        this.classrooms = this.originalClassRoom; // Gán danh sách gốc cho danh sách hiển thị ban đầu
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
    this.fetchClasses(this.searchKey);
  }

}
