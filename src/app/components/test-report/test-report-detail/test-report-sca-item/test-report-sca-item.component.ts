import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionReportResponse} from '../../../../responses/test-report/test-report.responses';

@Component({
  selector: 'app-test-report-sca-item',
  templateUrl: './test-report-sca-item.component.html',
  styleUrls: ['./test-report-sca-item.component.css'],
})
export class TestReportScaItemComponent implements OnInit, AfterViewInit {
  @Input() resultItem!: QuestionReportResponse;
  @Input() questionNumber!: number;
  correctAnswerIndex!: number;
  message: string = '';
  isChecked: boolean[] = [false, false, false, false];
  @ViewChild('label1', {static: true}) label1!: ElementRef;
  @ViewChild('label2', {static: true}) label2!: ElementRef;
  @ViewChild('label3', {static: true}) label3!: ElementRef;
  @ViewChild('label4', {static: true}) label4!: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.findCorrectAnswerIndex();
  }

  ngAfterViewInit() {
    this.checkAnswer();
  }


  checkAnswer() {
    this.resultItem.answers.forEach(
      (answer, index) => {
        if (this.resultItem.answer_of_user[0].length!==0) {
          if (answer.value===this.resultItem.answer_of_user[0]) {
            this.isChecked[index] = true;
            if (answer.is_correct) {
              this.setChosenElements(index, true);
            } else {
              this.setChosenElements(index);
            }
          }
        } else {
          this.message = 'Người dùng chưa chọn câu trả lời';
          this.setChosenElements(this.correctAnswerIndex, true);
          return;
        }

      },
    );
  }

  setChosenElements(index: number, isCorrect: boolean = false) {
    switch (index) {
      case 1: {
        this.label2.nativeElement.classList.add(isCorrect ? 'correct': 'incorrect');
        break;
      }
      case 2: {
        this.label3.nativeElement.classList.add(isCorrect ? 'correct': 'incorrect');
        break;
      }
      case 3: {
        this.label4.nativeElement.classList.add(isCorrect ? 'correct': 'incorrect');
        break;
      }
      default: {
        this.label1.nativeElement.classList.add(isCorrect ? 'correct': 'incorrect');
      }
    }
    if (isCorrect) {
      return;
    }
    this.setChosenElements(this.correctAnswerIndex, true);
  }

  private findCorrectAnswerIndex() {
    this.resultItem.answers.forEach(
      (answer, index) => {
        if (answer.is_correct) {
          this.correctAnswerIndex = index;
        }
      },
    );
  }
}
