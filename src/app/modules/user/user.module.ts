import {NgModule} from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {ThemeToggleComponent} from '../../components/theme-toggle/theme-toggle.component';
import {SettingsComponent} from '../../components/user/settings/settings.component';
import {UserComponent} from '../../components/user/user.component';
import {SharedModule} from '../shared/shared.module';
import {UserProfileComponent} from '../../components/user/user-profile/user-profile.component';
import {LessonsComponent} from 'src/app/components/user/user-profile/lessons/lessons.component';
import {TestsComponent} from 'src/app/components/user/user-profile/tests/tests.component';
import { ClassesCreatedComponent } from 'src/app/components/user/user-profile/classes-created/classes-created.component';
import { ClassesJoinedComponent } from 'src/app/components/user/user-profile/classes-joined/classes-joined.component';

import {UserRoutingModule} from './user-routing.module';


@NgModule({
  declarations: [
    ThemeToggleComponent,
    UserComponent,
    SettingsComponent,
    UserProfileComponent,
    LessonsComponent,
    TestsComponent,
    ClassesCreatedComponent,
    ClassesJoinedComponent,
  ],
  imports: [
    UserRoutingModule,
    MatSlideToggleModule,
    SharedModule,
  ],
})
export class UserModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
