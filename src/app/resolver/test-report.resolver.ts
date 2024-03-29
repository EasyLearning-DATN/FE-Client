import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {TestReportService} from "../services/test-report/test-report.service";
import {SharedService} from "../services/shared/shared.service";
import {TestReportResponse} from "../responses/test-report/test-report.responses";

export const testReportResolver: ResolveFn<TestReportResponse> = (route, state) => {
  const testReportService = inject(TestReportService);
  const sharedService = inject(SharedService);
  const testReport = sharedService.testReport;
  if (testReport === undefined || testReport.id !== <string>route.params['id']) {
    return testReportService.getOneTestReport(route.params['id']);
  } else {
    return testReport;
  }
};
