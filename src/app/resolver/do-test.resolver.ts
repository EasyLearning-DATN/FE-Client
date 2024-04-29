import {ResolveFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {TempTest} from "../DTOS/test/test.dto";
import {SharedService} from "../services/shared/shared.service";

export const doTestResolver: ResolveFn<TempTest> = (route, state) => {
  const sharedService = inject(SharedService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const res = cookieService.get(route.params['doTestId']);
  const data = localStorage.getItem(route.params['doTestId']);
  sharedService.isDoTest.next(true);
  if (!res) {
    return router.navigate(['/404']).then();
  } else if (data) {
    sharedService.doTest = JSON.parse(data);
    return sharedService.doTest;
  } else {
    return router.navigate(['/404']).then();
  }
};
