import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTestReportComponent} from '../../components/test-report/list-test-report/list-test-report.component';
import {TestReportDetailComponent} from '../../components/test-report/test-report-detail/test-report-detail.component';
import {CreateTestComponent} from '../../components/test/create-test/create-test.component';
import {DoTestComponent} from '../../components/test/do-test/do-test.component';
import {ListTestComponent} from '../../components/test/list-test/list-test.component';
import {TestDetailComponent} from '../../components/test/test-detail/test-detail.component';
import {TestEditComponent} from '../../components/test/test-detail/test-edit/test-edit.component';
import {TestComponent} from '../../components/test/test.component';
import {authCanActivateChildGuard} from '../../guards/auth.can-activate-child.guard';
import {testCanDeactivateGuard} from '../../guards/test.can-deactivate.guard';
import {doTestResolver} from '../../resolver/do-test.resolver';
import {questionTypeResolver} from '../../resolver/question.type.resolver';
import {resultTypeResolver} from '../../resolver/result-type.resolver';
import {testReportResolver} from '../../resolver/test-report.resolver';
import {testResolver} from '../../resolver/test.resolver';

const routes: Routes = [
  {path: 'list-test', component: ListTestComponent},

  {
    path: '', component: TestComponent, canActivateChild: [authCanActivateChildGuard], children: [
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
    ],
  },
  {path: ':id', component: TestDetailComponent, resolve: [testResolver]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {
}
