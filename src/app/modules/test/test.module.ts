import {NgModule} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {TestComponent} from '../../components/test/test.component';
import {LearningTestModule} from '../learning-test/learning-test.module';

import {TestRoutingModule} from './test-routing.module';


@NgModule({
  declarations: [TestComponent],
  imports: [
    TestRoutingModule,
    LearningTestModule,
  ],
})
export class TestModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
