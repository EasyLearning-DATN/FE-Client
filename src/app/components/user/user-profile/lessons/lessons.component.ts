import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserInfoResponse, UserResponse} from 'src/app/responses/user/user.responses';
import {UserService} from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';
import {SharedService} from '../../../../services/shared/shared.service';
import {LessonResponses} from 'src/app/responses/lesson/lesson.responses';
import {LessonsResponses} from 'src/app/responses/lessons/lessons.responses';
import {LessonService} from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  user !: UserInfoResponse;
  langForm = new FormGroup({
    lang: new FormControl('vi'),
  });
  lang!: string;
  
  currentPage = 0;
  totalPages = 0;
  totalPageArray: number[] = [];
  originalLessons: LessonResponses[] = [];
  lessons: LessonResponses[] = [];
  error = null;
  searchKey: string = '';

  constructor(
    private userService: UserService, private sharedService: SharedService, private lessonService: LessonService
  ) {}

  ngOnInit() {
    this.user = this.sharedService.user;
    this.fetchLessons(this.searchKey);
  }

  fetchLessons(key : string) {
    // get lesson by user Id
    const userId = this.user.username || '';
    this.searchKey = key;
    this.lessonService.getListLessonByUsername(this.searchKey, this.currentPage, userId).subscribe(
      (lessons: any) => {
        this.totalPages = lessons.totalPage; // Tổng số trang
        this.calculateTotalPageArray();
        this.originalLessons = lessons.data; // Lưu danh sách gốc
        this.lessons = this.originalLessons; // Gán danh sách gốc cho danh sách hiển thị ban đầu
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
    this.fetchLessons(this.searchKey);
  }
}
