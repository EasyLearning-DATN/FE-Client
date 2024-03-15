import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {LessonService} from "../../services/lesson/lesson.service";
import {SharedService} from "../../services/shared/shared.service";
import {TestListResponses, TestResponses} from "../../responses/test/test.responses";
import {TestService} from "../../services/test/test.service";
import {SearchLessonListResponse, SearchLessonResponses} from "../../responses/search-lesson/search-lesson.responses";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  isLogin: any;
  isLessonFetching = false;
  isTestFetching: boolean = false;
  lessons: SearchLessonResponses[] = [];
  tests: TestResponses[] = [];
  error = null;
  date: any;
  now: any;
  @Input('year') year: number;
  @Input('month') month: number;
  @Input('day') day: number;
  targetDate: any;
  targetTime: any;
  difference: number;
  @ViewChild('days', {static: true}) days!: ElementRef;
  @ViewChild('hours', {static: true}) hours!: ElementRef;
  @ViewChild('minutes', {static: true}) minutes!: ElementRef;
  @ViewChild('seconds', {static: true}) seconds!: ElementRef;
  private clockInterval!: number;

  constructor(
    // private loginSrv: LoginService,
    // private httpClient: HttpClient,
    private router: Router,
    private lessonService: LessonService,
    private sharedService: SharedService,
    private testService: TestService,
  ) {
    this.year = 2024;
    this.month = 4;
    this.day = 15;
    this.targetDate = new Date(this.year, this.month, this.day);
    this.targetTime = this.targetDate.getTime();
    this.difference = 0;
  }

  ngOnInit(): void {
    this.isLogin = !!localStorage.getItem('userInfo');
    // show lesson data
    // this.httpClient.get<any[]>(`${api}/lesson/all`).subscribe((res: any) => {
    //     this.lessons = res.data;
    // });
    this.fetchLessons();
    this.fetchTests();
  }

  ngAfterViewInit() {
    this.clockInterval = window.setInterval(() => {
      this.tickTock();
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);
      !isNaN(this.days.nativeElement.innerText)
        ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`);
    }, 1000);

  }

  ngOnDestroy() {
    clearInterval(this.clockInterval);
  }

  onViewLessonDetail(id: string) {
    this.router.navigate([`lesson`, id]);
  }

  onViewTestDetail(id: string) {
    this.router.navigate([`test`, id]);
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    this.days.nativeElement.innerText = Math.floor(this.difference);
    this.hours.nativeElement.innerText = 23 - this.date.getHours();
    this.minutes.nativeElement.innerText = 60 - this.date.getMinutes();
    this.seconds.nativeElement.innerText = 60 - this.date.getSeconds();
  }

  private fetchLessons() {
    this.isLessonFetching = true;
    this.lessonService.getListLessonHome().subscribe((lessons: SearchLessonListResponse) => {
      this.isLessonFetching = false;
      this.lessons = this.sharedService.lessonsHome;
      // console.log("Lessons: " + this.lessons);
    }, error => {
      this.isLessonFetching = false;
      this.error = error.message;
      console.log(this.error);

    });

  }

  private fetchTests() {
    this.isTestFetching = true;
    this.testService.getHomeTest().subscribe((tests: TestListResponses) => {
      this.isTestFetching = false;
      this.tests = this.sharedService.testsHome;
      console.log(this.tests);
    }, error => {
      this.isTestFetching = false;
      this.error = error.message;
      console.log(this.error);

    });
  }
}
