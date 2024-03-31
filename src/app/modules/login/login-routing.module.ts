import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfirmComponent} from '../../components/forget-password/confirm/confirm.component';
import {ForgetPasswordComponent} from '../../components/forget-password/forget-password.component';
import {LoginComponent} from '../../components/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgot-password', component: ForgetPasswordComponent},
  {path: 'confirm-password', component: ConfirmComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
