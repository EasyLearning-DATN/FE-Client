import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {
    path: 'lesson',
    loadChildren: () => import('./modules/lesson/lesson.module').then(mod => mod.LessonModule),
  },
  {
    path: 'test',
    loadChildren: () => import('./modules/test/test.module').then(mod => mod.TestModule),
  },
  {
    path: 'teaching',
    loadChildren: () => import('./modules/teaching_subsystem/teaching_subsystem.module').then(mod => mod.TeachingSubsystemModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(mod => mod.UserModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule),
  },
  {
    path: 'upgrade',
    loadChildren: () => import('./modules/upgrade/upgrade.module').then(mod => mod.UpgradeModule),
  },
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'},
  // add this one if your path is '' when you want to redirect - pathMatch: 'full'
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true,
    urlUpdateStrategy: 'eager',
    paramsInheritanceStrategy: 'always',
    scrollPositionRestoration: 'top', // Chỉ định vị trí cuộn sau khi chuyển hướng
    anchorScrolling: 'enabled',
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
