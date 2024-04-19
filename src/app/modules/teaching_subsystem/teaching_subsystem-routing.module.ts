import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FlashcardComponent} from '../../components/lesson/lesson-detail/flashcard/flashcard.component';
import {LessonDetailComponent} from '../../components/lesson/lesson-detail/lesson-detail.component';
import {LessonLearnComponent} from '../../components/lesson/lesson-detail/lesson-learn/lesson-learn.component';
import {LessonComponent} from '../../components/lesson/lesson.component';
import {ClassDetailComponent} from '../../components/teaching-subsystem/class-detail/class-detail.component';
import {ClassEditComponent} from '../../components/teaching-subsystem/class-edit/class-edit.component';
import {ClassListComponent} from '../../components/teaching-subsystem/class-list/class-list.component';
import {CreateClassComponent} from '../../components/teaching-subsystem/create-class/create-class.component';
import {TeachingSubsystemComponent} from '../../components/teaching-subsystem/teaching-subsystem.component';
import {ListTestReportComponent} from '../../components/test-report/list-test-report/list-test-report.component';
import {TestReportDetailComponent} from '../../components/test-report/test-report-detail/test-report-detail.component';
import {CreateTestComponent} from '../../components/test/create-test/create-test.component';
import {DoTestComponent} from '../../components/test/do-test/do-test.component';
import {ExamResultComponent} from '../../components/test/exam-result/exam-result.component';
import {TestDetailComponent} from '../../components/test/test-detail/test-detail.component';
import {TestEditComponent} from '../../components/test/test-detail/test-edit/test-edit.component';
import {TestComponent} from '../../components/test/test.component';
import {authCanActivateChildGuard} from '../../guards/auth.can-activate-child.guard';
import {testCanDeactivateGuard} from '../../guards/test.can-deactivate.guard';
import {classroomResolver} from '../../resolver/classroom.resolver';
import {doTestResolver} from '../../resolver/do-test.resolver';
import {lessonResolver} from '../../resolver/lesson.resolver';
import {questionTypeResolver} from '../../resolver/question.type.resolver';
import {resultTypeResolver} from '../../resolver/result-type.resolver';
import {testReportResolver} from '../../resolver/test-report.resolver';
import {testResolver} from '../../resolver/test.resolver';

const routes: Routes = [
  {
    path: '', component: TeachingSubsystemComponent, canActivateChild: [authCanActivateChildGuard], children: [
      {path: 'list-classroom', component: ClassListComponent},
      {path: 'invite', component: ClassListComponent},
      {path: 'create-classroom', component: CreateClassComponent},
      {
        path: ':classId/lesson', component: LessonComponent, canActivateChild: [
          // teacherRoleCanActivateChildGuard
        ], children: [
          {
            path: ':id', component: LessonDetailComponent, resolve: [lessonResolver, questionTypeResolver, resultTypeResolver], children: [
              {path: '', component: FlashcardComponent},
              {path: 'flashcard', component: FlashcardComponent},
              {path: 'learn', component: LessonLearnComponent},
            ],
          }],
      },
      {
        path: ':classId/test', component: TestComponent, children: [
          {
            path: 'test-report/:id', component: TestReportDetailComponent, resolve: [testReportResolver],
          },
          {
            path: 'my-test-report', component: ListTestReportComponent,
          },
          {
            path: 'create-test',
            component: CreateTestComponent,
            resolve: [resultTypeResolver, questionTypeResolver, resultTypeResolver],
          },
          {
            path: ':id/edit',
            component: TestEditComponent,
            resolve: [testResolver, questionTypeResolver, resultTypeResolver],
          },
          {
            path: ':id/do-test/:doTestId',
            component: DoTestComponent,
            canDeactivate: [testCanDeactivateGuard],
            resolve: [doTestResolver, questionTypeResolver, resultTypeResolver],
          },
          {
            path: 'exam-result/:id', component: ExamResultComponent,
          },
        ],
      },
      {path: ':classId/test/:id', component: TestDetailComponent, resolve: [testResolver]},
      {
        path: ':classId', component: ClassDetailComponent, resolve: [classroomResolver], children: [
          {
            path: 'edit', component: ClassEditComponent, canActivate: [
              // teacherRoleCanActivateGuard
            ],
          },

        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachingSubsystemRoutingModule {
}
