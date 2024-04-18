import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authCanActivateChildGuard} from '../../guards/auth.can-activate-child.guard';
import { FunnyWheelsComponent } from 'src/app/components/minigame/FunnyWheels/funny-wheels/funny-wheels.component';

const routes: Routes = [
  {
    path: '', component: FunnyWheelsComponent, canActivateChild: [authCanActivateChildGuard], children: [
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
