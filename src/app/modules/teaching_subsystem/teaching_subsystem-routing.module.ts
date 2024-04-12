import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authCanActivateGuard} from 'src/app/guards/auth.can-activate.guard';
import {ClassListComponent} from '../../components/teaching-subsystem/class-list/class-list.component';
import {TeachingSubsystemComponent} from '../../components/teaching-subsystem/teaching-subsystem.component';

const routes: Routes = [
  {
    path: '', component: TeachingSubsystemComponent, children: [
      {path: 'teaching-subsystem', component: ClassListComponent, canActivate: [authCanActivateGuard]},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachingSubsystemRoutingModule {
}
