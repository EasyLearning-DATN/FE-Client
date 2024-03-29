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
import {SettingsComponent} from './components/settings/settings.component';
import {questionTypeResolver} from "./resolver/question.type.resolver";
import {TestComponent} from './components/test/test.component';
import {UpgradeComponent} from './components/upgrade/upgrade/upgrade.component';
import {resultTypeResolver} from "./resolver/result-type.resolver";
import {CreateTestComponent} from "./components/test/create-test/create-test.component";
import {TestDetailComponent} from "./components/test/test-detail/test-detail.component";
import {TestEditComponent} from "./components/test/test-detail/test-edit/test-edit.component";
import {ListTestComponent} from "./components/test/list-test/list-test.component";
import {testResolver} from "./resolver/test.resolver";
import {PaymentSuccessComponent} from './components/upgrade/success/success.component';
import {authCanActivateGuard} from "./guards/auth.can-activate.guard";
import {authCanActivateChildGuard} from "./guards/auth.can-activate-child.guard";
import {DoTestComponent} from "./components/test/do-test/do-test.component";
import {doTestResolver} from "./resolver/do-test.resolver";
import {InvoiceComponent} from './components/upgrade/invoice/invoice.component';
import {ListTestReportComponent} from "./components/test-report/list-test-report/list-test-report.component";
import {testReportResolver} from "./resolver/test-report.resolver";
import {TestReportDetailComponent} from "./components/test-report/test-report-detail/test-report-detail.component";

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
  {
    path: 'test', component: TestComponent, canActivateChild: [authCanActivateChildGuard], children: [
      {path: ':id', component: TestDetailComponent, resolve: [testResolver]},
      {
        path: ':id/edit',
        component: TestEditComponent,
        resolve: [testResolver, questionTypeResolver, resultTypeResolver],
      },
      {
        path: ':id/do-test/:doTestId',
        component: DoTestComponent,
        resolve: [doTestResolver, questionTypeResolver, resultTypeResolver],
      },
    ],
  },
  {
    path: 'test-report/:id', component: TestReportDetailComponent, resolve: [testReportResolver], canActivate: [authCanActivateGuard],
  },
  {
    path: 'my-test-report', component: ListTestReportComponent, canActivate: [authCanActivateGuard],
  },
  {path: 'create-lesson', component: CreateLessonComponent, canActivate: [authCanActivateGuard]},
  {
    path: 'create-test',
    component: CreateTestComponent,
    canActivate: [authCanActivateGuard],
    resolve: [resultTypeResolver, questionTypeResolver, resultTypeResolver],
  },
  {
    path: 'list-lesson', component: ListLessonComponent, children: [
      {path: '', component: ItemsComponent},
      {path: 'my-lesson', component: ItemsComponent},
      {path: 'following-lesson', component: ItemsComponent},
      {path: 'history-lesson', component: ItemsComponent},
    ],
  },
  {path: 'settings', component: SettingsComponent},
  {path: 'list-test', component: ListTestComponent},
  {path: 'demo/do-test', component: DoTestComponent, resolve: []},
  {path: 'upgrade', component: UpgradeComponent, canActivate: [authCanActivateGuard]},
  {path: 'payment-success', component: PaymentSuccessComponent, canActivate: [authCanActivateGuard]},
  {path: 'invoice', component: InvoiceComponent},
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
