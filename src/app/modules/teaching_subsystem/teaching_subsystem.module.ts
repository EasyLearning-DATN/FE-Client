import {NgModule} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {TeachingSubsystemComponent} from 'src/app/components/teaching-subsystem/teaching-subsystem.component';
import {ClassDetailComponent} from '../../components/teaching-subsystem/class-detail/class-detail.component';
import {ClassListComponent} from '../../components/teaching-subsystem/class-list/class-list.component';
import {CreateClassComponent} from '../../components/teaching-subsystem/create-class/create-class.component';
import {LearningLessonModule} from '../learning-lesson/learning-lesson.module';
import {LearningTestModule} from '../learning-test/learning-test.module';
import {SharedModule} from '../shared/shared.module';
import {TeachingSubsystemRoutingModule} from './teaching_subsystem-routing.module';

@NgModule({
  declarations: [
    TeachingSubsystemComponent,
    ClassListComponent,
    ClassDetailComponent,
    CreateClassComponent,
  ],
  imports: [
    TeachingSubsystemRoutingModule,
    LearningLessonModule,
    LearningTestModule,
    SharedModule,
  ],
})
export class TeachingSubsystemModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
