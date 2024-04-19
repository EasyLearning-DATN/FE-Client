import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassDetailComponent} from '../../components/teaching-subsystem/class-detail/class-detail.component';
import {ClassEditComponent} from '../../components/teaching-subsystem/class-edit/class-edit.component';
import {ClassListComponent} from '../../components/teaching-subsystem/class-list/class-list.component';
import {CreateClassComponent} from '../../components/teaching-subsystem/create-class/create-class.component';
import {TeachingSubsystemComponent} from '../../components/teaching-subsystem/teaching-subsystem.component';
import {authCanActivateChildGuard} from '../../guards/auth.can-activate-child.guard';
import {teacherRoleCanActivateGuard} from '../../guards/teacher-role.can-activate.guard';
import {classroomResolver} from '../../resolver/classroom.resolver';

const routes: Routes = [
  {
    path: '', component: TeachingSubsystemComponent, canActivateChild: [authCanActivateChildGuard], children: [
      {path: 'list-classroom', component: ClassListComponent},
      {path: 'invite', component: ClassListComponent},
      {path: 'create-classroom', component: CreateClassComponent},
      {
        path: ':id', component: ClassDetailComponent, resolve: [classroomResolver], children: [
          {path: 'edit', component: ClassEditComponent, canActivate: [teacherRoleCanActivateGuard]},
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachingSubsystemRoutingModule {
}
