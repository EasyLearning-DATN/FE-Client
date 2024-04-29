import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateLessonComponent} from '../../components/lesson/create-lesson/create-lesson.component';
import {FlashcardComponent} from '../../components/lesson/lesson-detail/flashcard/flashcard.component';
import {LessonDetailComponent} from '../../components/lesson/lesson-detail/lesson-detail.component';
import {LessonLearnComponent} from '../../components/lesson/lesson-detail/lesson-learn/lesson-learn.component';
import {LessonComponent} from '../../components/lesson/lesson.component';
import {ItemsComponent} from '../../components/lesson/list-lesson/items/items.component';
import {ListLessonComponent} from '../../components/lesson/list-lesson/list-lesson.component';
import {authCanActivateGuard} from '../../guards/auth.can-activate.guard';
import {lessonResolver} from '../../resolver/lesson.resolver';
import {questionTypeResolver} from '../../resolver/question.type.resolver';
import {resultTypeResolver} from '../../resolver/result-type.resolver';

const routes: Routes = [
  {
    path: '', component: LessonComponent, children: [
      {path: 'create-lesson', component: CreateLessonComponent, canActivate: [authCanActivateGuard]},
      {
        path: 'list-lesson', component: ListLessonComponent, children: [
          {path: '', component: ItemsComponent},
          {path: 'my-lesson', component: ItemsComponent},
          {path: 'following-lesson', component: ItemsComponent},
          {path: 'history-lesson', component: ItemsComponent},
        ],
      },
      {
        path: ':id',
        component: LessonDetailComponent,
        resolve: [lessonResolver, questionTypeResolver, resultTypeResolver],
        children: [
          {path: '', component: FlashcardComponent},
          {path: 'flashcard', component: FlashcardComponent},
          {path: 'learn', component: LessonLearnComponent},
        ],
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonRoutingModule {
}
