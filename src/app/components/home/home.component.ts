import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
    isLogin: any;
    lessons: any[] = [];
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

    constructor(
        // private loginSrv: LoginService,
        // private httpClient: HttpClient,
        private router: Router,
        // private lessonService: LessonService,
        private renderer: Renderer2
    ) {
        this.year = 2024;
        this.month = 4;
        this.day = 15;
        this.targetDate = new Date(this.year, this.month, this.day);
        this.targetTime = this.targetDate.getTime();
        this.difference = 0;
    }

    ngOnInit(): void {
        // this.isLogin = this.loginSrv.checkLogin();
        // show lesson data
        // this.httpClient.get<any[]>(`${api}/lesson/all`).subscribe((res: any) => {
        //     this.lessons = res.data;
        // });
    }

    ngAfterViewInit() {
        setInterval(() => {
            this.tickTock();
            this.difference = this.targetTime - this.now;
            this.difference = this.difference / (1000 * 60 * 60 * 24);

            !isNaN(this.days.nativeElement.innerText)
                ? (this.days.nativeElement.innerText = Math.floor(this.difference))
                : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif" />`);
        }, 1000);
    }

    onViewDetail(
        // lesson: LessonModule
    ) {
        // this.lessonService.lessonDetail$ = of(lesson);
        // this.lessonService.userCreator$ = of(lesson.userInfo);
        // this.router.navigate([`lesson`, lesson.id]);
    }

    tickTock() {
        this.date = new Date();
        this.now = this.date.getTime();
        this.days.nativeElement.innerText = Math.floor(this.difference);
        this.hours.nativeElement.innerText = 23 - this.date.getHours();
        this.minutes.nativeElement.innerText = 60 - this.date.getMinutes();
        this.seconds.nativeElement.innerText = 60 - this.date.getSeconds();
    }
}
