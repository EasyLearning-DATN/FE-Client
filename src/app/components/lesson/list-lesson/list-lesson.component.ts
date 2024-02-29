import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-lesson',
  templateUrl: './list-lesson.component.html',
  styleUrls: ['./list-lesson.component.css']
})
export class ListLessonComponent {
  lessons: any[] = [];

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {

  }

  getMyLesson(id: number) {

  }

  onViewDetail(id: number) {

  }

  
}
