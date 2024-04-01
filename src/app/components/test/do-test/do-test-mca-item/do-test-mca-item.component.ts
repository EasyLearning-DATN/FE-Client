import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestReportItemDTO} from '../../../../DTOS/test-report/test-report.dto';
import {QuestionResponses} from '../../../../responses/question/question.responses';
import {SharedService} from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-do-test-mca-item',
  templateUrl: './do-test-mca-item.component.html',
  styleUrls: ['./do-test-mca-item.component.css'],
})
export class DoTestMcaItemComponent implements OnInit, AfterViewInit {
  @Input() question!: QuestionResponses;
  @Input() index!: number;
  @Input() total!: number;
  shuffledArray: number[] = [];
  originalArray: number[] = [0, 1, 2, 3];
  // isDisabled: boolean = false;
  totalAnswer: number = 0;
  isCorrect!: boolean;
  scoreEachAnswer: number = 0;
  @Input() userAnswers!: string[] | null | undefined;
  @Input() showRealAnswer: boolean = false;
  @ViewChild('btn1', {static: true}) btn1!: ElementRef;
  @ViewChild('btn2', {static: true}) btn2!: ElementRef;
  @ViewChild('btn3', {static: true}) btn3!: ElementRef;
  @ViewChild('btn4', {static: true}) btn4!: ElementRef;
  @ViewChild('chkbox1', {static: true}) chkbox1!: ElementRef;
  @ViewChild('chkbox2', {static: true}) chkbox2!: ElementRef;
  @ViewChild('chkbox3', {static: true}) chkbox3!: ElementRef;
  @ViewChild('chkbox4', {static: true}) chkbox4!: ElementRef;
  isDisabledBtn: boolean[] = [false, false, false, false];

  constructor(private routes: ActivatedRoute, private renderer2: Renderer2, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.randomizeArray();
    this.isCorrect = false;
    this.question.answers.forEach(
      value => {
        if (value.is_correct) {
          this.totalAnswer++;
        }
      },
    );

  }

  ngAfterViewInit() {
    if (this.userAnswers!=null) {
      for (let i = 0; i < this.userAnswers.length; i++) {
        this.checkAnswerAgain(this.userAnswers[i]);
      }
    }
    this.scoreEachAnswer = this.question.weighted / this.totalAnswer;
  }

  checkAnswer(ans: number, btn: HTMLButtonElement, checkBox: HTMLInputElement, event: Event) {
    if (!this.userAnswers) {
      this.userAnswers = [this.question.answers[ans].value];
    } else {
      this.userAnswers.push(this.question.answers[ans].value);
    }
    this.checkResultAnswer(ans, btn, checkBox);
    const testReportItem: TestReportItemDTO = {
      answers: this.userAnswers,
      question_id: this.question.id,
    };
    if (this.userAnswers.length >= this.totalAnswer) {
      this.isDisabledBtn.fill(true);

    }
    if (this.userAnswers.length <= this.totalAnswer) {
      if (this.isCorrect) {
        this.sharedService.saveQuestions(this.routes.snapshot.params['doTestId'], testReportItem, undefined, this.scoreEachAnswer);
      } else {
        this.sharedService.saveQuestions(this.routes.snapshot.params['doTestId'], testReportItem);
      }
    }
  }

  private randomizeArray() {
    this.shuffledArray = this.shuffleArray([...this.originalArray]);
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private checkAnswerAgain(ans: string) {
    if (ans===(<HTMLButtonElement>this.btn1.nativeElement).value) {
      this.checkResultAnswer(parseInt((<HTMLButtonElement>this.btn1.nativeElement).name), this.btn1.nativeElement, this.chkbox1.nativeElement);
    } else if (ans===(<HTMLButtonElement>this.btn2.nativeElement).value) {
      this.checkResultAnswer(parseInt((<HTMLButtonElement>this.btn2.nativeElement).name), this.btn2.nativeElement, this.chkbox2.nativeElement);
    } else if (ans===(<HTMLButtonElement>this.btn3.nativeElement).value) {
      this.checkResultAnswer(parseInt((<HTMLButtonElement>this.btn3.nativeElement).name), this.btn3.nativeElement, this.chkbox3.nativeElement);
    } else {
      this.checkResultAnswer(parseInt((<HTMLButtonElement>this.btn4.nativeElement).name), this.btn4.nativeElement, this.chkbox4.nativeElement);
    }

    if (this.userAnswers && this.userAnswers.length===this.totalAnswer) {
      // this.isDisabled = true;
      this.isDisabledBtn.fill(true);
    }
  }

  private checkResultAnswer(index: number, btn: HTMLButtonElement, checkBox: HTMLInputElement) {
    this.isDisabledBtn[index] = true;
    checkBox.checked = true;
    if (this.showRealAnswer) {
      if (this.question.answers[index].is_correct) {
        this.isCorrect = true;
        btn.classList.add('correct');
      } else {
        this.isCorrect = false;
        btn.classList.add('incorrect');
      }
    } else {
      btn.classList.add('answer_selected');
      this.isCorrect = this.question.answers[index].is_correct;
    }
  }
}
