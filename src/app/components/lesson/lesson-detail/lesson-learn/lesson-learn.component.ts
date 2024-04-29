import {Component, Input, OnInit} from '@angular/core';
import {QuestionResponses} from "../../../../responses/question/question.responses";
import {SharedService} from "../../../../services/shared/shared.service";

@Component({
  selector: 'app-lesson-learn',
  templateUrl: './lesson-learn.component.html',
  styleUrls: ['./lesson-learn.component.css'],
})
export class LessonLearnComponent implements OnInit {
  @Input() nameCode: string = "sca";
  questions!: QuestionResponses[];

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    // lấy câu hỏi từ shared service
    this.questions = this.sharedService.lesson.questions;
    this.sharedService.lessonChanged.subscribe(
      (lesson) => {
        this.questions = lesson.questions;
      },
    );
  }

}
