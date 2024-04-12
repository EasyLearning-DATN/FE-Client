import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TeachingSubsystemComponent } from "src/app/components/teaching_subsystem/teaching-subsystem/teaching-subsystem.component";
import { authCanActivateGuard } from "src/app/guards/auth.can-activate.guard";

const routes: Routes = [
    {
      path: '', component: TeachingSubsystemComponent, children: [
        {path: 'teaching-subsystem', component: TeachingSubsystemComponent,canActivate: [authCanActivateGuard]},
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class TeachingSubsystemRoutingModule {
  }
  