import {NgModule} from '@angular/core';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {ChangePasswordComponent} from '../../components/change-password/change-password.component';
import {ConfirmComponent} from '../../components/forget-password/confirm/confirm.component';
import {ForgetPasswordComponent} from '../../components/forget-password/forget-password.component';
import {LoginComponent} from '../../components/login/login.component';
import {SharedModule} from '../shared/shared.module';

import {LoginRoutingModule} from './login-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    ConfirmComponent,
  ],
  imports: [
    LoginRoutingModule,
    SharedModule,
  ],
})
export class LoginModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
