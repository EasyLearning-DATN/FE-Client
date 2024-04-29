import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { LessonsResponses } from 'src/app/responses/lessons/lessons.responses';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-list-lesson',
  templateUrl: './list-lesson.component.html',
  styleUrls: ['./list-lesson.component.css']
})
export class ListLessonComponent {
  currentPage = 0;
  lessonsPerPage = 10;
  totalPages = 0;
  totalPageArray: number[] = [];
  originalLessons: LessonResponses[] = [];
  lessons: LessonResponses[] = [];
  isFetching = false;
  error = null;
  routeSub = new Subscription();
  searchKey: string = '';

  constructor(private httpClient: HttpClient, private router: Router,private lessonService: LessonService) { }

  ngOnInit(): void {
    this.fetchLessons();
  }

  fetchLessons() {
    this.isFetching = true;
    this.lessonService.getAllLessons(this.currentPage).subscribe(
      (lessons: any) => {
        this.isFetching = false;
        this.totalPages = lessons.data.totalPage; // Tổng số trang
        this.calculateTotalPageArray();
        this.originalLessons = lessons.data; // Lưu danh sách gốc
        this.lessons = this.originalLessons; // Gán danh sách gốc cho danh sách hiển thị ban đầu
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
    this.fetchLessons();
  }

  getMyLesson(id: number) {

  }

  onViewDetail(id: number) {

  }
}
