import {Component, Input} from '@angular/core';
import {SearchLessonResponses} from "../../../../../responses/search-lesson/search-lesson.responses";
import {SharedService} from "../../../../../services/shared/shared.service";
import {LessonService} from "../../../../../services/lesson/lesson.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-add-question-search-item',
  templateUrl: './add-question-search-item.component.html',
  styleUrls: ['./add-question-search-item.component.css'],
})
export class AddQuestionSearchItemComponent {
  @Input() lesson!: SearchLessonResponses;

  constructor(private sharedService: SharedService, private lessonService: LessonService) {
  }

  onShowLesson() {
    this.sharedService.isFetching.next(true);
    this.fetchLesson().then();
  }

  async fetchLesson() {
    const lesson$ = this.lessonService.getOneLesson(this.lesson.id);
    await lastValueFrom(lesson$).then(lesson => {
      this.sharedService.lessonChanged.next(lesson);
      return lesson;
    });
  }
}
