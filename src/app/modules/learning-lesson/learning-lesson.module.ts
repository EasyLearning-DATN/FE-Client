import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {RouterModule} from '@angular/router';
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
import {ItemsComponent} from '../../components/lesson/list-lesson/items/items.component';
import {ListLessonComponent} from '../../components/lesson/list-lesson/list-lesson.component';
import {ReportlessonComponent} from '../../components/lesson/reportlesson/reportlesson.component';
import {CreateLessonTestComponent} from '../../components/test/create-test/create-lesson-test/create-lesson-test.component';
import {DemoQuestionModule} from '../demo-question/demo-question.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
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
    DemoQuestionModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
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
    DemoQuestionModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    SharedModule,
    RouterModule,
  ],
})
export class LearningLessonModule {
}
