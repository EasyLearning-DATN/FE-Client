import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Component, Input, OnInit} from '@angular/core';
import {QuestionTypeResponses} from '../../../../../responses/question-type/question-type.responses';
import {QuestionResponses} from '../../../../../responses/question/question.responses';
import {SharedService} from '../../../../../services/shared/shared.service';

@Component({
  selector: 'app-add-question-search-item-question',
  templateUrl: './add-question-search-item-question.component.html',
  styleUrls: ['./add-question-search-item-question.component.css'],
  animations: [trigger('addQuestion', [
    transition(':enter', [
      animate('.5s ease-in-out', keyframes([
        style({
          opacity: 0,
          'background-color': '#1565FF !important',
          offset: 0,
        }),
        style({
          opacity: 1,
          'background-color': '#1565FF !important',
          offset: 0.1,
        }),
        // style({
        //   opacity: 1,
        //   'background-color': '#1565FF !important',
        //   offset: 0.7,
        // }),
        style({
          opacity: 0,
          'background-color': '#1565FF !important',
          width: '8rem',
          height: '8rem',
          offset: 0.9,
        }),
        style({
          opacity: 0,
          'transform': 'translateX(0) translateY(0)',
          'background-color': '#1565FF !important',
          offset: 1,
        }),
      ])),
    ]),
    // transition(':leave', [
    //   group([
    //     animate('0.5s ease-in-out', style({
    //       color: 'red',
    //     })),
    //     animate('1s ease-in-out', style({
    //       opacity: '0',
    //       'transform': 'translateX(100%)',
    //     })),
    //   ]),
    // ]),
  ])],
})
export class AddQuestionSearchItemQuestionComponent implements OnInit {
  nameCode!: string;
  isAddingQuestion = false;
  @Input() question!: QuestionResponses;
  questionTypes!: QuestionTypeResponses[];
  @Input() isCreateTest: boolean = true;

  constructor(private sharedService: SharedService) {

  }

  ngOnInit() {
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem('questionTypes'));
    // this.questionTypes = this.sharedService.questionTypeResponses;

    this.questionTypes.forEach((questionType) => {
      if (questionType.id===this.question.question_type_id) {
        this.nameCode = questionType.code;
      }
    });
  }

  onAddQuestionTest() {
    const question: QuestionResponses[] = [this.question];
    setTimeout(() => {
      this.isAddingQuestion = false;
      this.sharedService.onAddQuestionsOfTest(question);
    }, 500);

    this.isAddingQuestion = true;

  }
}
