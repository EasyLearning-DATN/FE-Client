import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from './components/login/login.component';
import {LessonComponent} from './components/lesson/lesson.component';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {CreateLessonComponent} from './components/lesson/create-lesson/create-lesson.component';
import {ListLessonComponent} from './components/lesson/list-lesson/list-lesson.component';
import {LessonDetailComponent} from "./components/lesson/lesson-detail/lesson-detail.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {FlashcardComponent} from "./components/lesson/lesson-detail/flashcard/flashcard.component";
import {LessonLearnComponent} from "./components/lesson/lesson-detail/lesson-learn/lesson-learn.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgot-password', component: ForgetPasswordComponent},
    {
        path: 'lesson', component: LessonComponent, children: [
            {
                path: ':id', component: LessonDetailComponent, children: [
                    {path: '', component: FlashcardComponent},
                    {path: 'flashcard', component: FlashcardComponent},
                    {path: 'learn', component: LessonLearnComponent},
                ]
            }
        ]
    },
    {path: 'create-lesson', component: CreateLessonComponent},
    {path: 'list-lesson', component: ListLessonComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: '**', redirectTo: '/404'},
    // add this one if your path is '' when you want to redirect - pathMatch: 'full'
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
