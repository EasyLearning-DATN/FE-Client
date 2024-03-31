import {CanDeactivateFn} from '@angular/router';
import {DoTestComponent} from '../components/test/do-test/do-test.component';

export const testCanDeactivateGuard: CanDeactivateFn<DoTestComponent> = (component: DoTestComponent, currentRoute, currentState, nextState) => {

  // const router = inject(Router);
  // router.events.pipe(
  //   filter(
  //     (event: any) => {
  //       return (event instanceof NavigationStart);
  //     },
  //   ),
  // ).subscribe(
  //   (event: NavigationStart) => {
  //     console.log(event);
  //     component.openConfirmEndTest();
  //     if (!component.canNavigate) {
  //       // event.
  //     }
  //   },
  // );
  if (!component.canNavigate) {
    component.openConfirmEndTest();
  }

  return component.canNavigate;
};
