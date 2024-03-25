import {ResolveFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {TempTest} from "../DTOS/test/test.dto";

export const doTestResolver: ResolveFn<TempTest> = (route, state) => {
  // const testService = inject(TestService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const res = cookieService.get(route.params['doTestId']);
  const data = localStorage.getItem(route.params['doTestId']);
  if (!res) {
    return router.navigate(['/404']).then();
  }
    // else if (res === 'creating') {
    //   console.log('hello creating');
    //   return testService.getDoTest(route.params['id'], route.params['doTestId']);
  // }
  else if (data) {
    const test: TempTest = JSON.parse(data);
    return test;
  } else {
    return router.navigate(['/404']).then();
  }
};
