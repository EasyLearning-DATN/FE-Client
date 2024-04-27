import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonResponses} from 'src/app/responses/lesson/lesson.responses';
import {LessonsResponses} from 'src/app/responses/lessons/lessons.responses';
import {LessonService} from 'src/app/services/lesson/lesson.service';
import {SharedService} from 'src/app/services/shared/shared.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})

export class ItemsComponent implements OnInit, OnDestroy {
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

  constructor(
    private router: Router,
    private lessonService: LessonService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.fetchLessons();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  detail() {
    alert("hello");
  }

  private fetchLessons() {
    this.routeSub = this.route.url.subscribe(
      response => {
        console.log(response);
        if (response.length === 0) {
          this.fetchAllLessons();
          return;
        }
        switch (response[0].path) {
          case 'my-lesson': {
            this.fetchMyLessons();
            break;
          }
          case 'following-lesson': {
            this.fetchFollowingLessons();
            break;
          }
          case 'history-lesson': {
            this.fetchHistoryLessons();
            break;
          }
          default: {
            this.fetchAllLessons();
            break;
          }
        }
      },
    );
  }

  private fetchMyLessons() {
    // get lesson by user Id
    const userInfoString = localStorage.getItem('userInfo') || '';
    const userInfo = JSON.parse(userInfoString);
    const userId = userInfo ? userInfo.id : '';
    this.isFetching = true;
    console.log(userId);
    this.lessonService.getListLessonByUser(userId).subscribe(
      (lessons: any) => {
        this.isFetching = false;
        this.lessons = lessons.data;
        console.log(this.lessons);
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
    this.fetchAllLessons();
  }

  private fetchFollowingLessons() {

  }

  private fetchHistoryLessons() {

  }

  fetchAllLessons() {
    this.isFetching = true;
    this.lessonService.getAllLessons(this.currentPage).subscribe(
      (lessons: any) => {
        this.isFetching = false;
        this.totalPages = lessons.totalPage; // Tổng số trang
        console.log(this.totalPages);
        this.calculateTotalPageArray();
        this.originalLessons = lessons.data; 
        this.lessons = this.originalLessons; 
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      },
    );
  }

  searchLessons(key : string) {
    this.isFetching = true;
    this.lessonService.searchLesson(key).subscribe(
      (lessons: LessonsResponses) => {
        this.isFetching = false;
        this.lessons = lessons.data;
        console.log(this.lessons);
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      },
    );
  }

}
