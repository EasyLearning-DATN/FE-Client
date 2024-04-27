import { ResolveFn } from '@angular/router';

export const testReportClassResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
