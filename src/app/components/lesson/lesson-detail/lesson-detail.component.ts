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

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private lessonService: LessonService) {
  }

  ngOnInit() {
    this.lesson = this.sharedService.lesson;
  }

  onCopyURL() {
    navigator.clipboard.writeText(window.location.href);
  }
}
