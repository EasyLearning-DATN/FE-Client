import {AfterContentInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TestReportItemDTO} from '../../../../DTOS/test-report/test-report.dto';
import {QuestionResponses} from '../../../../responses/question/question.responses';
import {SharedService} from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-do-test-fitb-item',
  templateUrl: './do-test-fitb-item.component.html',
  styleUrls: ['./do-test-fitb-item.component.css'],
})
export class DoTestFitbItemComponent implements OnInit, AfterContentInit {
  @Input() question!: QuestionResponses;
  @Input() index!: number;
  @Input() total!: number;
  isDisabled: boolean = false;
  isCorrect: boolean = false;
  answer!: string;
  @Input() userAnswers: string[] | null | undefined;
  @Input() showRealAnswer: boolean = false;
  @ViewChild('input', {static: true}) inputElement!: ElementRef;

  constructor(private routes: ActivatedRoute, private renderer2: Renderer2, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.answer = '';
    this.isDisabled = false;
  }

  ngAfterContentInit() {
    this.initAnswer();
    // this.sharedService.nextQuestion.subscribe(
    //   (res) => {
    //     if (res.typeCode.code === 'fitb') {
    //       this.userAnswers = res.userAnswers;
    //       if (this.userAnswers != null) {
    //         this.answer = this.userAnswers[0];
    //         this.checkAnswerAgain(this.answer);
    //       } else {
    //         console.log('helloInside');
    //         this.answer = "";
    //         this.isDisabled = false;
    //         this.checkAnswerAgain(this.answer);
    //       }
    //     }
    //   },
    // );
  }

  submitAnswer() {
    if (!this.userAnswers) {
      this.userAnswers = [this.answer.toLowerCase().trim()];
      this.checkResultAnswer(this.userAnswers[0]);
      const testReportItem: TestReportItemDTO = {
        answers: this.userAnswers,
        question_id: this.question.id,
      };
      if (this.isCorrect) {
        this.sharedService.saveQuestions(this.routes.snapshot.params['doTestId'], testReportItem, undefined, this.question.weighted);
      } else {
        this.sharedService.saveQuestions(this.routes.snapshot.params['doTestId'], testReportItem);
      }

    }

    if (this.userAnswers.length===1 && this.userAnswers) {
      this.isDisabled = true;
      return;
    }
  }

  private checkAnswerAgain(ans: string) {
    this.answer = ans;
    this.checkResultAnswer(ans);
    if (this.userAnswers && this.userAnswers.length===1) {
      this.isDisabled = true;
    }
  }

  private checkResultAnswer(ans: string) {
    if (ans==='') {
      (<HTMLInputElement>this.inputElement.nativeElement).classList.remove('correct', 'incorrect', 'answer_selected');
      return;
    }

    if (this.showRealAnswer) {
      this.question.answers.forEach(answer => {
        if (answer.value.trim().toLowerCase()===ans) {
          this.isCorrect = true;
          (<HTMLInputElement>this.inputElement.nativeElement).classList.remove('correct', 'incorrect', 'answer_selected');
          this.inputElement.nativeElement.classList.add('correct');
          return;
        } else {
          (<HTMLInputElement>this.inputElement.nativeElement).classList.remove('correct', 'incorrect', 'answer_selected');
          this.inputElement.nativeElement.classList.add('incorrect');
        }
      });
    } else {
      this.inputElement.nativeElement.classList.add('answer_selected');
      this.question.answers.forEach(answer => {
        if (answer.value.trim().toLowerCase()===ans) {
          this.isCorrect = true;
          return;
        }
      });
    }
  }

  private initAnswer() {
    if (this.userAnswers!=null) {
      this.answer = this.userAnswers[0];
      this.checkAnswerAgain(this.answer);
    } else {
      this.answer = '';
      this.isDisabled = false;
      this.checkAnswerAgain(this.answer);
    }
  }
}
