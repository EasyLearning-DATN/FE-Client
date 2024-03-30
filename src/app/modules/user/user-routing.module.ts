import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from '../../components/user/settings/settings.component';
import {UserComponent} from '../../components/user/user.component';
import {authCanActivateChildGuard} from '../../guards/auth.can-activate-child.guard';

const routes: Routes = [
  {
    path: '', component: UserComponent, canActivateChild: [authCanActivateChildGuard], children: [
      {path: 'settings', component: SettingsComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
