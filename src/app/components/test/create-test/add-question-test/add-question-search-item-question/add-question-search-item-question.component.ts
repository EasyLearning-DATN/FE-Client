import {Component, Input, OnInit} from '@angular/core';
import {QuestionResponses} from "../../../../../responses/question/question.responses";
import {QuestionTypeResponses} from "../../../../../responses/question-type/question-type.responses";
import {SharedService} from "../../../../../services/shared/shared.service";

@Component({
  selector: 'app-add-question-search-item-question',
  templateUrl: './add-question-search-item-question.component.html',
  styleUrls: ['./add-question-search-item-question.component.css'],
})
export class AddQuestionSearchItemQuestionComponent implements OnInit {
  nameCode!: string;
  @Input() question!: QuestionResponses;
  questionTypes!: QuestionTypeResponses[];
  @Input() isCreateTest: boolean = true;

  constructor(private sharedService: SharedService) {

  }

  ngOnInit() {
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem("questionTypes"));
    // this.questionTypes = this.sharedService.questionTypeResponses;

    this.questionTypes.forEach((questionType) => {
      if (questionType.id === this.question.question_type_id) {
        this.nameCode = questionType.code;
      }
    });
  }

  onAddQuestionTest() {
    const question: QuestionResponses[] = [this.question];
    this.sharedService.onAddQuestionsOfTest(question);
  }
}
