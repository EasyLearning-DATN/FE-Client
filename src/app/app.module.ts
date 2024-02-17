import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { TestComponent } from './components/test/test.component';
import { CreateLessonComponent } from './components/lesson/create-lesson/create-lesson.component';
import { ListLessonComponent } from './components/lesson/list-lesson/list-lesson.component';
import { QuestionsComponent } from './components/lesson/questions/questions.component';
import { CreateTestComponent } from './components/test/create-test/create-test.component';
import { LessonDetailComponent } from './components/lesson/lesson-detail/lesson-detail.component';
import { TestDetailComponent } from './components/test/test-detail/test-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    UserInfoComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    LessonComponent,
    TestComponent,
    CreateLessonComponent,
    ListLessonComponent,
    QuestionsComponent,
    CreateTestComponent,
    LessonDetailComponent,
    TestDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
