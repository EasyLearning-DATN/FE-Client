import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassDetailComponent} from '../../components/teaching-subsystem/class-detail/class-detail.component';
import {ClassListComponent} from '../../components/teaching-subsystem/class-list/class-list.component';
import {CreateClassComponent} from '../../components/teaching-subsystem/create-class/create-class.component';
import {TeachingSubsystemComponent} from '../../components/teaching-subsystem/teaching-subsystem.component';
import {authCanActivateChildGuard} from '../../guards/auth.can-activate-child.guard';

const routes: Routes = [
  {
    path: '', component: TeachingSubsystemComponent, canActivateChild: [authCanActivateChildGuard], children: [
      {path: 'teaching-subsystem', component: ClassListComponent},
      {path: 'create-classroom', component: CreateClassComponent},
      {path: ':id', component: ClassDetailComponent, children:[
          {path: 'edit', component: }
        ]},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachingSubsystemRoutingModule {
}
