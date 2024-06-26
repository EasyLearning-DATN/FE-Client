import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateLessonComponent} from '../../components/lesson/create-lesson/create-lesson.component';
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
import {teacherRoleCanActivateChildGuard} from '../../guards/teacher-role.can-activate-child.guard';
import {teacherRoleCanActivateGuard} from '../../guards/teacher-role.can-activate.guard';
import {testCanDeactivateGuard} from '../../guards/test.can-deactivate.guard';
import {checkIsClassOwnerResolver} from '../../resolver/check-is-class-owner.resolver';
import {checkIsInClassroomResolver} from '../../resolver/check-is-in-classroom.resolver';
import {checkUserEduRoleResolver} from '../../resolver/check-user-edu-role.resolver';
import {classroomResolver} from '../../resolver/classroom.resolver';
import {doTestResolver} from '../../resolver/do-test.resolver';
import {lessonResolver} from '../../resolver/lesson.resolver';
import {questionTypeResolver} from '../../resolver/question.type.resolver';
import {resultTypeResolver} from '../../resolver/result-type.resolver';
import {testReportClassMemberResolver} from '../../resolver/test-report-class-member.resolver';
import {testReportResolver} from '../../resolver/test-report.resolver';
import {testResolver} from '../../resolver/test.resolver';

const routes: Routes = [
  {
    path: '', component: TeachingSubsystemComponent, canActivateChild: [authCanActivateChildGuard], children: [
      {path: 'list-classroom', component: ClassListComponent},
      {path: 'invite', component: ClassListComponent},
      {
        path: 'create-classroom',
        component: CreateClassComponent,
        canActivate: [teacherRoleCanActivateGuard],
        resolve: [checkUserEduRoleResolver],
      },
      {
        path: ':classId/lesson', component: LessonComponent,
        resolve: [checkIsClassOwnerResolver],
        canActivateChild: [
          teacherRoleCanActivateChildGuard,
        ], children: [
          {
            path: 'create-lesson', component: CreateLessonComponent,
          },
          {
            path: ':id', component: LessonDetailComponent, resolve: [lessonResolver, questionTypeResolver, resultTypeResolver], children: [
              {path: '', component: FlashcardComponent},
              {path: 'flashcard', component: FlashcardComponent},
              {path: 'learn', component: LessonLearnComponent},
            ],
          },
        ],
      },
      {
        path: ':classId/test', component: TestComponent,
        resolve: [checkIsInClassroomResolver],
        children: [
          {
            path: 'test-report/:id', component: TestReportDetailComponent, resolve: [
              checkIsInClassroomResolver,
              testReportResolver,
            ],
          },
          {
            path: 'my-test-report', component: ListTestReportComponent,
            resolve: [checkIsInClassroomResolver],
          },
          {
            path: 'create-test',
            component: CreateTestComponent,
            resolve: [
              checkIsClassOwnerResolver,
              classroomResolver, resultTypeResolver, questionTypeResolver, resultTypeResolver],
          },
          {
            path: ':id/edit',
            component: TestEditComponent,
            resolve: [
              checkIsClassOwnerResolver,
              classroomResolver, testResolver, questionTypeResolver, resultTypeResolver],
          },
          {
            path: ':id/test-report', component: TestReportDetailComponent,
            resolve: [
              checkIsInClassroomResolver,
              testReportClassMemberResolver,
            ],
          },
          {
            path: ':id/do-test/:doTestId',
            component: DoTestComponent,
            canDeactivate: [testCanDeactivateGuard],
            resolve: [
              checkIsInClassroomResolver,
              doTestResolver, questionTypeResolver, resultTypeResolver],
          },
          {
            path: 'exam-result/:id', component: ExamResultComponent,
            resolve: [checkIsClassOwnerResolver],
          },
        ],
      },
      {
        path: ':classId/test/:id', component: TestDetailComponent, resolve: [
          checkIsInClassroomResolver,
          testResolver, testReportClassMemberResolver],
      },
      {
        path: ':classId/edit', component: ClassEditComponent, resolve: [
          checkIsClassOwnerResolver,
          classroomResolver],
      },
      {
        path: ':classId', component: ClassDetailComponent, resolve: [
          checkIsInClassroomResolver,
          classroomResolver],
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
