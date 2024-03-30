import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonResponses } from '../../../responses/lesson/lesson.responses';
import { SharedService } from '../../../services/shared/shared.service';
import { LessonService } from '../../../services/lesson/lesson.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  lesson!: LessonResponses;
  isCreator: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private lessonService: LessonService
  ) {}

  ngOnInit() {
    // lấy lesson từ shared service
    this.lesson = this.sharedService.lesson;
    this.sharedService.lessonChanged.subscribe((lesson) => {
      this.lesson = lesson;
    });
    this.totalCMT = this.lesson.totalComment;

    // truyển userInfo từ localStorage và lấy id
    const userInfoString = localStorage.getItem('userInfo') || '';
    if (userInfoString === '') {
      this.isCreator = false;
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      const userId = userInfo ? userInfo.id : '';

      // Kiểm tra xem user có phải người tạo bài học hay không
      this.lessonService.checkLessonOfUser(userId, this.lesson.id).subscribe(
        (response) => {
          // console.log(response.data.length);
          this.isCreator = response.data.length !== 0;
        },
        (error) => {
          this.isCreator = false;
        }
      );
    }

  }

  onCopyURL() {
    // Copy đường dãn vào clipboard
    navigator.clipboard.writeText(window.location.href);
  }

  updateTotalCMT() {
    this.lesson.totalComment += 1;
  }
}
