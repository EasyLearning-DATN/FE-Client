import {Component, Input, OnInit} from '@angular/core';
import {QuestionResponses} from "../../../../../responses/question/question.responses";
import {SharedService} from "../../../../../services/shared/shared.service";
import {QuestionTypeResponses} from "../../../../../responses/question-type/question-type.responses";

@Component({
  selector: 'app-lesson-learn-item',
  templateUrl: './lesson-learn-item.component.html',
  styleUrls: ['./lesson-learn-item.component.css'],
})
export class LessonLearnItemComponent implements OnInit {
  nameCode!: string;
  @Input() question!: QuestionResponses;
  questionTypes!: QuestionTypeResponses[];

  constructor(private sharedService: SharedService) {

  }

  ngOnInit() {
    // this.questionTypes = this.sharedService.questionTypeResponses;
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem("questionTypes"));
    this.questionTypes.forEach((questionType) => {
      if (questionType.id === this.question.question_type_id) {
        this.nameCode = questionType.code;
      }
    });
  }
}
