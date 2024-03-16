import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgxBootstrapIconsLibComponent} from "ngx-bootstrap-icons";
import {QuestionResponses} from "../../../../responses/question/question.responses";
import {SharedService} from "../../../../services/shared/shared.service";

@Component({
  selector: 'app-demo-mca-question',
  templateUrl: './demo-mca-question.component.html',
  styleUrls: ['./demo-mca-question.component.css'],
})
export class DemoMcaQuestionComponent implements OnInit {

  @ViewChild('deleteIcon', {static: true}) deleteIcon!: NgxBootstrapIconsLibComponent;
  isHover: boolean = false;
  checkHoverDeleteButton: Record<string, boolean> = {};
  @Input() question!: QuestionResponses;
  @Input() index!: number;
  @Input() total!: number;
  checkAnswer: Record<string, boolean>[] = [{}, {}, {}, {}];

  constructor(private renderer2: Renderer2, private sharedService: SharedService) {

  }

  ngOnInit() {
    this.setCheckHoverDeleteButton();
    this.setCheckAnswer();
  }

  setCheckHoverDeleteButton() {
    this.checkHoverDeleteButton = {
      'fs-3': this.isHover,
      'fs-2': !this.isHover,
    };
  }

  setCheckAnswer() {
    this.checkAnswer = [{
      'correct': this.question.answers[0].is_correct,
      'incorrect': !this.question.answers[0].is_correct,
    }, {
      'correct': this.question.answers[1].is_correct,
      'incorrect': !this.question.answers[1].is_correct,
    }, {
      'correct': this.question.answers[2].is_correct,
      'incorrect': !this.question.answers[2].is_correct,
    }, {
      'correct': this.question.answers[3].is_correct,
      'incorrect': !this.question.answers[3].is_correct,
    }];
  }

  onDeleteQuestion() {
    this.sharedService.onRemoveQuestionOfTest(this.index);
  }

  onMEnterDelete() {
    this.isHover = true;
    this.setCheckHoverDeleteButton();
  }

  onMLeaveDelete() {
    this.isHover = false;
    this.setCheckHoverDeleteButton();
  }


}
