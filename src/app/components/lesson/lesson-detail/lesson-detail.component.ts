import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LessonResponses} from '../../../responses/lesson/lesson.responses';
import {LessonService} from '../../../services/lesson/lesson.service';
import {SharedService} from '../../../services/shared/shared.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  lesson!: LessonResponses;
  isCreator: boolean = false;
  totalCMT: number = 0;
  classRoomId: null | string = null;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private lessonService: LessonService,
  ) {
  }

  ngOnInit() {
    this.classRoomId = this.route.snapshot.paramMap.get('classId');

    // lấy lesson từ shared service
    this.lesson = this.sharedService.lesson;

    console.log(this.lesson.questions);

    this.totalCMT = this.lesson.totalComment;
    this.sharedService.lessonChanged.subscribe((lesson) => {
      this.lesson = lesson;
      this.totalCMT = lesson.totalComment;
    });

    // truyển userInfo từ localStorage và lấy id
    const userInfoString = localStorage.getItem('userInfo') || '';
    if (userInfoString==='') {
      this.isCreator = false;
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      const userId = userInfo ? userInfo.id: '';
      if (userId===this.lesson.created_by) {
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
