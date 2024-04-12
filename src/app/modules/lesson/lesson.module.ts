import {NgModule} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {LessonComponent} from '../../components/lesson/lesson.component';
import {LearningLessonModule} from '../learning-lesson/learning-lesson.module';

import {LessonRoutingModule} from './lesson-routing.module';


@NgModule({
  declarations: [
    LessonComponent,
  ],
  imports: [
    LearningLessonModule,
    LessonRoutingModule,
  ],
})
export class LessonModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
