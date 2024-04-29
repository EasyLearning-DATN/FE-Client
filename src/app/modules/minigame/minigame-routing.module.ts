import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FunnyWheelsComponent} from 'src/app/components/minigame/FunnyWheels/funny-wheels/funny-wheels.component';
import {authCanActivateChildGuard} from '../../guards/auth.can-activate-child.guard';
import {teacherRoleCanActivateChildGuard} from '../../guards/teacher-role.can-activate-child.guard';
import {checkUserEduRoleResolver} from '../../resolver/check-user-edu-role.resolver';

const routes: Routes = [
  {
    path: '',
    component: FunnyWheelsComponent,
    resolve: [checkUserEduRoleResolver],
    canActivateChild: [authCanActivateChildGuard, teacherRoleCanActivateChildGuard],
    children: [
      {path: 'FunnyWheels', component: FunnyWheelsComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiniGameRoutingModule {
}
