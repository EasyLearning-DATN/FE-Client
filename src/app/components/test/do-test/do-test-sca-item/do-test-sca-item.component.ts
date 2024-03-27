import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {QuestionResponses} from "../../../../responses/question/question.responses";
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../../../../services/shared/shared.service";
import {TestReportItemDTO} from "../../../../DTOS/test-report/test-report.dto";

@Component({
  selector: 'app-do-test-sca-item',
  templateUrl: './do-test-sca-item.component.html',
  styleUrls: ['./do-test-sca-item.component.css'],
})
export class DoTestScaItemComponent implements OnInit, AfterViewInit {
  @Input() question!: QuestionResponses;
  @Input() index!: number;
  @Input() total!: number;
  shuffledArray: number[] = [];
  originalArray: number[] = [0, 1, 2, 3];
  // originalAnswers: AnswerResponses[] = [];
  isDisabled: boolean = false;
  @Input() userAnswer!: string[] | null;
  @Input() showRealAnswer: boolean = false;
  @ViewChild("btn1", {static: true}) btn1!: ElementRef;
  @ViewChild("btn2", {static: true}) btn2!: ElementRef;
  @ViewChild("btn3", {static: true}) btn3!: ElementRef;
  @ViewChild("btn4", {static: true}) btn4!: ElementRef;

  constructor(private routes: ActivatedRoute, private renderer2: Renderer2, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.randomizeArray();
  }

  ngAfterViewInit() {
    if (this.userAnswer != null) {
      this.checkAnswerAgain(this.userAnswer[0]);
    }
  }

  checkAnswer(ans: number, btn: HTMLButtonElement) {
    this.userAnswer = [this.question.answers[ans].value];
    this.checkResultAnswer(ans, btn);
    this.isDisabled = true;
    const testReportItem: TestReportItemDTO = {
      answers: this.userAnswer,
      question_id: this.question.id,
    };
    this.sharedService.saveQuestions(this.routes.snapshot.params['doTestId'], testReportItem);
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
    if (ans === (<HTMLButtonElement>this.btn1.nativeElement).value) {
      this.checkResultAnswer(parseInt((<HTMLButtonElement>this.btn1.nativeElement).name), this.btn1.nativeElement);
    } else if (ans === (<HTMLButtonElement>this.btn2.nativeElement).value) {
      this.checkResultAnswer(parseInt((<HTMLButtonElement>this.btn2.nativeElement).name), this.btn2.nativeElement);
    } else if (ans === (<HTMLButtonElement>this.btn3.nativeElement).value) {
      this.checkResultAnswer(parseInt((<HTMLButtonElement>this.btn3.nativeElement).name), this.btn3.nativeElement);
    } else {
      this.checkResultAnswer(parseInt((<HTMLButtonElement>this.btn4.nativeElement).name), this.btn4.nativeElement);
    }
    this.isDisabled = true;
  }

  private checkResultAnswer(index: number, btn: HTMLButtonElement) {
    if (this.showRealAnswer) {
      if (this.question.answers[index].is_correct) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("incorrect");
      }
    } else {
      btn.classList.add("answer_selected");
    }
  }


}
