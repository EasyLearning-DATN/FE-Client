import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {lastValueFrom, Observable, Subscription} from 'rxjs';
import {LessonResponses} from '../../../../responses/lesson/lesson.responses';
import {SearchLessonResponses} from '../../../../responses/search-lesson/search-lesson.responses';
import {LessonService} from '../../../../services/lesson/lesson.service';
import {SharedService} from '../../../../services/shared/shared.service';

@Component({
  selector: 'app-add-question-test',
  templateUrl: './add-question-test.component.html',
  styleUrls: ['./add-question-test.component.css'],
  animations: [trigger('addAllQuestions', [
    transition(':enter', [
      animate('1.5s ease-in-out', keyframes([
        style({
          opacity: 0,
          'transform': 'translateX(0) translateY(0)',
          'background-color': '#1565FF !important',
          offset: 0,
        }),
        style({
          opacity: 1,
          'transform': 'translateX(0) translateY(0)',
          'background-color': '#1565FF !important',
          offset: 0.1,
        }),
        style({
          opacity: 1,
          'transform': 'translateX(-50vw) translateY(40vh)',
          'background-color': '#1565FF !important',
          offset: 0.7,
        }),
        style({
          opacity: 0,
          'transform': 'translateX(-50vw) translateY(40vh)',
          'background-color': '#1565FF !important',
          width: '8rem',
          height: '8rem',
          offset: 0.9,
        }),
        style({
          opacity: 0,
          'transform': 'translateX(0) translateY(0)',
          'background-color': '#1565FF !important',
          offset: 1,
        }),
      ])),
    ]),
    // transition(':leave', [
    //   group([
    //     animate('0.5s ease-in-out', style({
    //       color: 'red',
    //     })),
    //     animate('1s ease-in-out', style({
    //       opacity: '0',
    //       'transform': 'translateX(100%)',
    //     })),
    //   ]),
    // ]),
  ])],
})
export class AddQuestionTestComponent implements OnInit, OnDestroy {
  isAddingQuestions = false;
  searchKey: string = '';
  lessons!: SearchLessonResponses[];
  lesson!: LessonResponses;
  classRoomId: string | null = '';
  totalResults!: number;
  isFetchingLesson: boolean = true;
  isFetchingQuestions: boolean = false;
  sourceForm!: FormGroup;
  isButtonClicked: boolean = false;
  lessonSub!: Subscription;
  fetchingSub!: Subscription;

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService, private lessonService: LessonService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();
    this.classRoomId = this.route.snapshot.paramMap.get('classId');
    this.sharedService.lessonChanged.subscribe(lesson => {
      this.lesson = lesson;
      this.isFetchingQuestions = false;
    });
    this.sharedService.isFetching.subscribe(resp => {
      this.isFetchingQuestions = resp;
    });
  }

  ngOnDestroy() {

  }

  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {backdrop: 'static', position: 'end'});
  }

  async onSearch() {
    if (!this.isButtonClicked) {
      return;
    }
    let result$: Observable<SearchLessonResponses[]>;
    if (!this.classRoomId) {
      if (this.sourceForm.get('source')?.value==='myLibrary') {
        const userInfo = JSON.parse(<string>localStorage.getItem('userInfo'));
        result$ = this.lessonService.searchLessonForTest(this.searchKey, 0, userInfo.id);
      } else {
        result$ = this.lessonService.searchLessonForTest(this.searchKey);
      }
    } else {
      result$ = this.lessonService.searchLessonOfClassForTest(this.searchKey, 0, this.classRoomId);
    }

    // Tạm thời viết như vậy
    await lastValueFrom(result$).then(result => {
      this.isFetchingLesson = false;
      return result;
    });
    this.lessons = this.sharedService.lessonsSearch;
  }

  onAddAllQuestions() {
    const questions = [...this.lesson.questions];
    setTimeout(() => {
      this.isAddingQuestions = false;
      this.sharedService.onAddQuestionsOfTest(questions);
    }, 1500);

    this.isAddingQuestions = true;
  }

  private initForm() {
    this.sourceForm = new FormGroup({
      source: new FormControl('community'),
    });
  }
}
