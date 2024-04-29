import {inject} from '@angular/core';
import {CanDeactivateFn, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs';
import screenfull from 'screenfull';
import {DoTestComponent} from '../components/test/do-test/do-test.component';
import {SharedService} from '../services/shared/shared.service';

export const testCanDeactivateGuard: CanDeactivateFn<DoTestComponent> = (component: DoTestComponent, currentRoute, currentState, nextState) => {

  const router = inject(Router);
  const sharedService = inject(SharedService);
  router.events.pipe(
    filter(
      (event: any) => {
        return (event instanceof NavigationStart);
      },
    ),
  ).subscribe(
    (event: NavigationStart) => {
      if (event.navigationTrigger==='hashchange') {
        if (!component.canNavigate) {
          sharedService.isDoTest.next(false);
          if (screenfull.isEnabled) {
            screenfull.toggle();
          }
        }
      }
    },
  );
  if (!component.canNavigate) {
    component.openConfirmEndTest();
  }

  return component.canNavigate;
};
