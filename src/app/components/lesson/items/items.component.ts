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
      (lessons: LessonsResponses) => {
        this.isFetching = false;
        this.lessons = lessons.data;
        console.log(this.lessons);
      },
      error => {
        this.error = error.message;
      },
    );
  }

  private fetchFollowingLessons() {

  }

  private fetchHistoryLessons() {

  }

  fetchAllLessons() {
    this.isFetching = true;
    this.lessonService.getAllLessons().subscribe(
      (lessons: LessonsResponses) => {
        this.isFetching = false;
        this.originalLessons = lessons.data; // Lưu danh sách gốc
        this.lessons = this.originalLessons; // Gán danh sách gốc cho danh sách hiển thị ban đầu
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
