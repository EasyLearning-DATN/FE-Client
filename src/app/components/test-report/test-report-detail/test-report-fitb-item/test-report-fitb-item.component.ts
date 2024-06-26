import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionReportResponse} from '../../../../responses/test-report/test-report.responses';

@Component({
  selector: 'app-test-report-fitb-item',
  templateUrl: './test-report-fitb-item.component.html',
  styleUrls: ['./test-report-fitb-item.component.css'],
})
export class TestReportFitbItemComponent implements OnInit, AfterViewInit {
  @Input() resultItem!: QuestionReportResponse;
  @Input() questionNumber!: number;
  isAnswerCorrect = false;
  message: string = '';
  correctAnswers!: string[];
  @ViewChild('input', {static: true}) inputField!: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.getCorrectAnswers();
  }

  ngAfterViewInit() {
    this.checkAnswer();
  }

  checkAnswer() {
    console.log('hello');
    for (let answer of this.resultItem.answers) {
      if (this.resultItem.answer_of_user.length > 0) {
        if (answer.value.trim().toLowerCase()===this.resultItem.answer_of_user[0].trim().toLowerCase()) {
          this.inputField.nativeElement.classList.add('correct');
          return;
        }
      } else {
        this.message = 'Người dùng chưa chọn câu trả lời';
        this.inputField.nativeElement.classList.add('incorrect');
        return;
      }
    }
    this.isAnswerCorrect = (<HTMLInputElement>this.inputField.nativeElement).classList.contains('correct');
    if (!this.isAnswerCorrect) {
      this.inputField.nativeElement.classList.add('incorrect');
    }
  }

  private getCorrectAnswers() {
    this.correctAnswers = this.resultItem.answers.map(answer => {
      return answer.value.trim().toLowerCase();
    });
  }

}
