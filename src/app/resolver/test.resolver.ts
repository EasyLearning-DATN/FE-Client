import {inject} from '@angular/core';
import {ResolveFn} from '@angular/router';
import {TestResponses} from '../responses/test/test.responses';
import {SharedService} from '../services/shared/shared.service';
import {TestService} from '../services/test/test.service';

export const testResolver: ResolveFn<TestResponses> = (route, state) => {
  const testService = inject(TestService);
  const sharedService = inject(SharedService);
  const test = sharedService.test;
  if (test===undefined || test.id!==<string>route.params['id']) {
    return testService.getOneTest(route.params['id']);
  } else {
    return test;
  }
};
