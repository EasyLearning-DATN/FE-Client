import {inject} from '@angular/core';
import {ResolveFn, Router, UrlTree} from '@angular/router';
import {TestReportResponse} from '../responses/test-report/test-report.responses';
import {UserResponse} from '../responses/user/user.responses';
import {SharedService} from '../services/shared/shared.service';
import {TestReportService} from '../services/test-report/test-report.service';

export const testReportClassMemberResolver: ResolveFn<TestReportResponse[] | UrlTree> = (route, state) => {
  const testReportService = inject(TestReportService);
  const sharedService = inject(SharedService);
  const router = inject(Router);
  const user: string | null = localStorage.getItem('userInfo');
  if (!user) {
    return router.createUrlTree(['/login']);
  } else {
    const userInfo: UserResponse = JSON.parse(user);
    return testReportService.getTestReportByTestIdAndUserId(route.params['id'], userInfo.userInfoId ? userInfo.userInfoId: -1);
  }

};
