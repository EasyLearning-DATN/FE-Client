import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionReportResponse} from "../../../../responses/test-report/test-report.responses";

@Component({
  selector: 'app-test-report-fitb-item',
  templateUrl: './test-report-fitb-item.component.html',
  styleUrls: ['./test-report-fitb-item.component.css'],
})
export class TestReportFitbItemComponent implements OnInit, AfterViewInit {
  @Input() resultItem!: QuestionReportResponse;
  @Input() questionNumber!: number;
  message: string = "";
  correctAnswers!: string[];
  @ViewChild("input", {static: true}) inputField!: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.getCorrectAnswers();
  }

  ngAfterViewInit() {
    this.checkAnswer();
  }

  checkAnswer() {
    console.log("hello");
    this.resultItem.answers.forEach(
      (answer, index) => {
        if (this.resultItem.answer_of_user.length > 0) {
          if (answer.value === this.resultItem.answer_of_user[0]) {
            this.inputField.nativeElement.classList.add("correct");
            return;
          }
        } else {
          this.message = "Người dùng chưa chọn câu trả lời";
          this.inputField.nativeElement.classList.add("inCorrect");
          return;
        }

      },
    );
    const isAnswerCorrect = (<HTMLInputElement>this.inputField.nativeElement).classList.contains("correct");
    if (!isAnswerCorrect) {
      this.inputField.nativeElement.classList.add("inCorrect");
    }
  }

  private getCorrectAnswers() {
    this.correctAnswers = this.resultItem.answers.map(answer => {
      return answer.value;
    });
  }

}
