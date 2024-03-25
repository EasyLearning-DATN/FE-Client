import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {SharedService} from "../../../services/shared/shared.service";
import {TempTest} from "../../../DTOS/test/test.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.css'],
})
export class DoTestComponent implements OnInit, AfterViewInit, OnDestroy {

  doTest!: TempTest;
  totalMinutes: number = 0;
  totalSeconds: number = 0;
  targetDate!: Date;
  targetTime: any;
  date: Date = new Date();
  isTotalTimeTest = false;
  isEachQuestionTimeTest = false;
  currentQuestion: number = 0;
  private clockInterval!: number;

  constructor(private renderer2: Renderer2, private sharedService: SharedService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getTempTest();
    this.getTiming();
  }

  ngAfterViewInit() {
    let totalSeconds = (this.targetTime - this.date.getTime()) / 1000;
    this.clockInterval = window.setInterval(() => {
      totalSeconds--;
      this.setTiming(totalSeconds);
      if (totalSeconds === 0) {
        this.stopTimer();
      }
    }, 1000);

  }

  ngOnDestroy() {
    this.stopTimer();
  }

  getTempTest() {
    const tempTest = localStorage.getItem(this.route.snapshot.params['doTestId']);
    if (tempTest) {
      this.doTest = JSON.parse(tempTest);
    }

    console.log(this.doTest);
  }

  getTiming() {
    if (this.doTest.endTime) {
      if (this.doTest.test?.time_question) {
        this.isEachQuestionTimeTest = true;
      }
      if (this.doTest.test?.time_total) {
        this.isTotalTimeTest = true;
      }
      this.targetDate = this.doTest.endTime;
      this.targetTime = new Date(this.targetDate).getTime();
    }
  }

  stopTimer() {
    clearInterval(this.clockInterval);
  }

  setTiming(totalSeconds: number) {
    if (this.doTest.test?.time_total) {
      this.totalSeconds = Math.floor(totalSeconds % 60);
      this.totalMinutes = Math.floor(totalSeconds / 60);
    }
    if (this.doTest.test?.time_question) {
      const totalTime = this.doTest.test?.time_question * this.doTest.test?.total_question;

      const questionIdx = (totalTime - totalSeconds) / this.doTest.test?.time_question;
      console.log(questionIdx);
      this.totalSeconds = Math.floor(totalSeconds % 60);
      this.totalMinutes = Math.floor(totalSeconds / 60);
    }
  }


}
