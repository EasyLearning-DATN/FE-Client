import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from './components/login/login.component';
import {LessonComponent} from './components/lesson/lesson.component';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {CreateLessonComponent} from './components/lesson/create-lesson/create-lesson.component';
import {ListLessonComponent} from './components/lesson/list-lesson/list-lesson.component';
import {LessonDetailComponent} from "./components/lesson/lesson-detail/lesson-detail.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {FlashcardComponent} from "./components/lesson/lesson-detail/flashcard/flashcard.component";
import {LessonLearnComponent} from "./components/lesson/lesson-detail/lesson-learn/lesson-learn.component";
import {ConfirmComponent} from './components/forget-password/confirm/confirm.component';
import {lessonResolver} from "./resolver/lesson.resolver";
import {ItemsComponent} from "./components/lesson/items/items.component";
import {questionTypeResolver} from "./resolver/question.type.resolver";
import {TestComponent} from './components/test/test.component';
import {UpgradeComponent} from './components/upgrade/upgrade/upgrade.component';
import {resultTypeResolver} from "./resolver/result-type.resolver";
import {CreateLessonTestComponent} from "./components/test/create-test/create-lesson-test/create-lesson-test.component";
import {CreateTestComponent} from "./components/test/create-test/create-test.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgetPasswordComponent},
  {path: 'confirm-password', component: ConfirmComponent},
  {
    path: 'lesson', component: LessonComponent, children: [
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
  {path: 'create-lesson', component: CreateLessonComponent},
  {path: 'create-test', component: CreateTestComponent, resolve: [resultTypeResolver]},
  {
    path: 'list-lesson', component: ListLessonComponent, children: [
      {path: '', component: ItemsComponent},
      {path: 'my-lesson', component: ItemsComponent},
      {path: 'following-lesson', component: ItemsComponent},
      {path: 'history-lesson', component: ItemsComponent},
    ],
  },
  {path: 'list-test', component: TestComponent},
  {path: 'demo/add-test', component: CreateLessonTestComponent, resolve: [resultTypeResolver]},
  {path: 'upgrade', component: UpgradeComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'},
  // add this one if your path is '' when you want to redirect - pathMatch: 'full'
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true,
    urlUpdateStrategy: 'eager',
    paramsInheritanceStrategy: 'always',
    scrollPositionRestoration: 'top', // Chỉ định vị trí cuộn sau khi chuyển hướng
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
