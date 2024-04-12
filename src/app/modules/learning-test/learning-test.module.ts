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
import {TranslateModule} from '@ngx-translate/core';
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
import {DoTestFitbItemComponent} from '../../components/test/do-test/do-test-fitb-item/do-test-fitb-item.component';
import {DoTestMcaItemComponent} from '../../components/test/do-test/do-test-mca-item/do-test-mca-item.component';
import {DoTestScaItemComponent} from '../../components/test/do-test/do-test-sca-item/do-test-sca-item.component';
import {DoTestComponent} from '../../components/test/do-test/do-test.component';
import {ExamResultComponent} from '../../components/test/exam-result/exam-result.component';
import {ListTestComponent} from '../../components/test/list-test/list-test.component';
import {TestDetailComponent} from '../../components/test/test-detail/test-detail.component';
import {TestEditComponent} from '../../components/test/test-detail/test-edit/test-edit.component';
import {DemoQuestionModule} from '../demo-question/demo-question.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    AddQuestionTestComponent,
    AddQuestionSearchItemComponent,
    AddQuestionSearchItemQuestionComponent,
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
    ExamResultComponent,
  ],
  imports: [
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
    DemoQuestionModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    TranslateModule,
    SharedModule,
    RouterModule,
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
    DemoQuestionModule,
    AddQuestionTestComponent,
    AddQuestionSearchItemComponent,
    AddQuestionSearchItemQuestionComponent,
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
    ExamResultComponent,
  ],
})
export class LearningTestModule {
}
