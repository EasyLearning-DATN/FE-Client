import {NgModule} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {ListTestReportComponent} from '../../components/test-report/list-test-report/list-test-report.component';
import {TestReportDetailComponent} from '../../components/test-report/test-report-detail/test-report-detail.component';
import {TestReportFitbItemComponent} from '../../components/test-report/test-report-detail/test-report-fitb-item/test-report-fitb-item.component';
import {TestReportMcaItemComponent} from '../../components/test-report/test-report-detail/test-report-mca-item/test-report-mca-item.component';
import {TestReportScaItemComponent} from '../../components/test-report/test-report-detail/test-report-sca-item/test-report-sca-item.component';
import {TestReportComponent} from '../../components/test-report/test-report.component';
import {
  AddQuestionSearchItemQuestionComponent,
} from '../../components/test/create-test/add-question-test/add-question-search-item-question/add-question-search-item-question.component';
import {
  AddQuestionSearchItemComponent,
} from '../../components/test/create-test/add-question-test/add-question-search-item/add-question-search-item.component';
import {AddQuestionTestComponent} from '../../components/test/create-test/add-question-test/add-question-test.component';
import {CreateTestComponent} from '../../components/test/create-test/create-test.component';
import {DemoFitbQuestionComponent} from '../../components/test/create-test/demo-fitb-question/demo-fitb-question.component';
import {DemoMcaQuestionComponent} from '../../components/test/create-test/demo-mca-question/demo-mca-question.component';
import {DemoScaQuestionComponent} from '../../components/test/create-test/demo-sca-question/demo-sca-question.component';
import {DoTestFitbItemComponent} from '../../components/test/do-test/do-test-fitb-item/do-test-fitb-item.component';
import {DoTestMcaItemComponent} from '../../components/test/do-test/do-test-mca-item/do-test-mca-item.component';
import {DoTestScaItemComponent} from '../../components/test/do-test/do-test-sca-item/do-test-sca-item.component';
import {DoTestComponent} from '../../components/test/do-test/do-test.component';
import {ListTestComponent} from '../../components/test/list-test/list-test.component';
import {TestDetailComponent} from '../../components/test/test-detail/test-detail.component';
import {TestEditComponent} from '../../components/test/test-detail/test-edit/test-edit.component';
import {TestComponent} from '../../components/test/test.component';
import {SharedModule} from '../shared/shared.module';

import {TestRoutingModule} from './test-routing.module';
import { ExamResultComponent } from 'src/app/components/test/exam-result/exam-result.component';


@NgModule({
  declarations: [
    AddQuestionTestComponent,
    DemoScaQuestionComponent,
    DemoMcaQuestionComponent,
    DemoFitbQuestionComponent,
    AddQuestionSearchItemComponent,
    AddQuestionSearchItemQuestionComponent,
    TestComponent,
    CreateTestComponent,
    TestDetailComponent,
    TestEditComponent,
    ListTestComponent,
    DoTestComponent,
    DoTestScaItemComponent,
    DoTestMcaItemComponent,
    DoTestFitbItemComponent,
    TestReportComponent,
    ListTestReportComponent,
    TestReportFitbItemComponent,
    TestReportMcaItemComponent,
    TestReportScaItemComponent,
    TestReportDetailComponent,
    ExamResultComponent
  ],
  imports: [
    TestRoutingModule,
    SharedModule,
  ],
})
export class TestModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
