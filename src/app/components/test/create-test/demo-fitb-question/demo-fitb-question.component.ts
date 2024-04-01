import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgxBootstrapIconsLibComponent} from 'ngx-bootstrap-icons';
import {QuestionResponses} from '../../../../responses/question/question.responses';
import {SharedService} from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-demo-fitb-question',
  templateUrl: './demo-fitb-question.component.html',
  styleUrls: ['./demo-fitb-question.component.css'],
})
export class DemoFitbQuestionComponent implements OnInit {

  @ViewChild('deleteIcon', {static: true}) deleteIcon!: NgxBootstrapIconsLibComponent;
  isHover: boolean = false;
  checkHoverDeleteButton: Record<string, boolean> = {};
  @Input() question!: QuestionResponses;
  @Input() index!: number;
  @Input() total!: number;
  answer: string = '';

  constructor(private renderer2: Renderer2, private sharedService: SharedService) {

  }

  ngOnInit() {
    this.setCheckHoverDeleteButton();
    this.getAnswers();
  }

  setCheckHoverDeleteButton() {
    this.checkHoverDeleteButton = {
      'fs-3': this.isHover,
      'fs-2': !this.isHover,
    };
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

  private getAnswers() {
    this.answer = this.question.answers.map(
      answer => answer.value,
    ).toString();
  }
}
