import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { LessonsResponses } from 'src/app/responses/lessons/lessons.responses';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  isLogin: any;
  isFetching = false;
  error = null;
  lessons: LessonResponses[] = [];

  constructor(
    private router: Router,
    private lessonService: LessonService,
    private sharedService: SharedService
  ) { 

  }

  ngOnInit(): void {
      this.fetchLessonsItem();
  }

  fetchLessonsItem() {
    // get lesson by user Id
    const userInfoString = localStorage.getItem('userInfo') || '';
    const userInfo = JSON.parse(userInfoString);
    const userId = userInfo ? userInfo.id : '';
    this.isFetching = true;
    this.lessonService.getListLessonByUser(userId).subscribe((lessons: LessonsResponses) => {
      this.isFetching = false;
      this.lessons = lessons.data;
      console.log("Lessons: " + this.lessons);
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(this.error);
    });
  }

  detail() {
    alert("hello")
  }
}
