import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LessonResponses} from "../../../responses/lesson/lesson.responses";
import {SharedService} from "../../../services/shared/shared.service";
import {LessonService} from "../../../services/lesson/lesson.service";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {

  lesson!: LessonResponses;
  isCreator: boolean = false;
  totalCMT: number = 0;


  constructor(private route: ActivatedRoute, private sharedService: SharedService, private lessonService: LessonService) {
  }

  ngOnInit() {
    // lấy lesson từ shared service
    this.lesson = this.sharedService.lesson;
    this.sharedService.lessonChanged.subscribe(
      (lesson) => {
        this.lesson = lesson;
      },
    );

    // truyển userInfo từ localStorage và lấy id
    const userInfoString = localStorage.getItem('userInfo') || '';
    if (userInfoString === '') {
      this.isCreator = false;
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      const userId = userInfo ? userInfo.id : '';
      if (userId === this.lesson.created_by) {
        this.isCreator = true;
      } else {
        this.isCreator = false;
      }
    }
  }

  onCopyURL() {
    // Copy đường dãn vào clipboard
    navigator.clipboard.writeText(window.location.href);
  }

  updateTotalCMT() {
    this.totalCMT += 1;
  }
}
