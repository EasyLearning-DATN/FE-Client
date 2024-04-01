import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {NgModule} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {CreateLessonComponent} from '../../components/lesson/create-lesson/create-lesson.component';
import {CommentItemComponent} from '../../components/lesson/lesson-detail/comment/comment-item/comment-item.component';
import {CommentComponent} from '../../components/lesson/lesson-detail/comment/comment.component';
import {AddQuestionsComponent} from '../../components/lesson/lesson-detail/edit-lesson/add-questions/add-questions.component';
import {EditLessonComponent} from '../../components/lesson/lesson-detail/edit-lesson/edit-lesson.component';
import {
  EditQuestionItemComponent,
} from '../../components/lesson/lesson-detail/edit-lesson/edit-questions/edit-question-item/edit-question-item.component';
import {EditQuestionsComponent} from '../../components/lesson/lesson-detail/edit-lesson/edit-questions/edit-questions.component';
import {FlashcardItemComponent} from '../../components/lesson/lesson-detail/flashcard/flashcard-item/flashcard-item.component';
import {FlashcardComponent} from '../../components/lesson/lesson-detail/flashcard/flashcard.component';
import {LessonDetailComponent} from '../../components/lesson/lesson-detail/lesson-detail.component';
import {LessonLearnItemComponent} from '../../components/lesson/lesson-detail/lesson-learn/lesson-learn-item/lesson-learn-item.component';
import {LessonLearnComponent} from '../../components/lesson/lesson-detail/lesson-learn/lesson-learn.component';
import {LessonComponent} from '../../components/lesson/lesson.component';
import {ItemsComponent} from '../../components/lesson/list-lesson/items/items.component';
import {ListLessonComponent} from '../../components/lesson/list-lesson/list-lesson.component';
import {ReportlessonComponent} from '../../components/lesson/reportlesson/reportlesson.component';
import {CreateLessonTestComponent} from '../../components/test/create-test/create-lesson-test/create-lesson-test.component';
import {SharedModule} from '../shared/shared.module';

import {LessonRoutingModule} from './lesson-routing.module';


@NgModule({
  declarations: [
    LessonComponent,
    CreateLessonComponent,
    ListLessonComponent,
    LessonDetailComponent,
    FlashcardComponent,
    FlashcardItemComponent,
    LessonLearnComponent,
    EditLessonComponent,
    AddQuestionsComponent,
    EditQuestionsComponent,
    ItemsComponent,
    LessonLearnItemComponent,
    CommentComponent,
    CommentItemComponent,
    EditQuestionItemComponent,
    CreateLessonTestComponent,
    ReportlessonComponent,
  ],
  imports: [
    LessonRoutingModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    SharedModule,
  ],
})
export class LessonModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
