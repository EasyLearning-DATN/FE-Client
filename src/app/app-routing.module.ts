import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { LoginComponent } from './components/login/login.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { CreateLessonComponent } from './components/lesson/create-lesson/create-lesson.component';
import { ListLessonComponent } from './components/lesson/list-lesson/list-lesson.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forgot-password', component: ForgetPasswordComponent},
  { path: 'lesson', component: LessonComponent},
  { path: 'create-lesson', component: CreateLessonComponent},
  { path: 'list-lesson', component: ListLessonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
