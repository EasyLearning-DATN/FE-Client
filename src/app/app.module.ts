import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {UserInfoComponent} from './components/user-info/user-info.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {LessonComponent} from './components/lesson/lesson.component';
import {TestComponent} from './components/test/test.component';
import {CreateLessonComponent} from './components/lesson/create-lesson/create-lesson.component';
import {ListLessonComponent} from './components/lesson/list-lesson/list-lesson.component';
import {QuestionsComponent} from './components/lesson/questions/questions.component';
import {CreateTestComponent} from './components/test/create-test/create-test.component';
import {LessonDetailComponent} from './components/lesson/lesson-detail/lesson-detail.component';
import {TestDetailComponent} from './components/test/test-detail/test-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {allIcons, NgxBootstrapIconsModule} from 'ngx-bootstrap-icons';
import {LocationStrategy, NgOptimizedImage, PathLocationStrategy} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CreateLessonTestComponent} from './components/test/create-test/create-lesson-test/create-lesson-test.component';
import {FlashcardComponent} from './components/lesson/lesson-detail/flashcard/flashcard.component';
import {FlashcardItemComponent} from './components/lesson/lesson-detail/flashcard/flashcard-item/flashcard-item.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LessonLearnComponent} from './components/lesson/lesson-detail/lesson-learn/lesson-learn.component';
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {EditLessonComponent} from './components/lesson/lesson-detail/edit-lesson/edit-lesson.component';
import {AddQuestionsComponent} from './components/lesson/lesson-detail/edit-lesson/add-questions/add-questions.component';
import {EditQuestionsComponent} from './components/lesson/lesson-detail/edit-lesson/edit-questions/edit-questions.component';
import {ConfirmComponent} from './components/forget-password/confirm/confirm.component';
import {ItemsComponent} from './components/lesson/items/items.component';
import {LessonLearnItemComponent} from './components/lesson/lesson-detail/lesson-learn/lesson-learn-item/lesson-learn-item.component';
import {ShortenTextPipe} from './pipe/shorten-text.pipe';
import {ConfirmModalComponent} from './components/commons/confirm-modal/confirm-modal.component';
import {HomeItemComponent} from './components/home/home-item/home-item.component';
import {ReportlessonComponent} from "./components/lesson/reportlesson/reportlesson.component";
import {
  EditQuestionItemComponent,
} from './components/lesson/lesson-detail/edit-lesson/edit-questions/edit-question-item/edit-question-item.component';
import {AddQuestionTestComponent} from './components/test/create-test/add-question-test/add-question-test.component';
import {DemoScaQuestionComponent} from './components/test/create-test/demo-sca-question/demo-sca-question.component';
import {DemoMcaQuestionComponent} from './components/test/create-test/demo-mca-question/demo-mca-question.component';
import {DemoFitbQuestionComponent} from './components/test/create-test/demo-fitb-question/demo-fitb-question.component';
import {
  AddQuestionSearchItemComponent,
} from './components/test/create-test/add-question-test/add-question-search-item/add-question-search-item.component';
import {
  AddQuestionSearchItemQuestionComponent,
} from './components/test/create-test/add-question-test/add-question-search-item-question/add-question-search-item-question.component';
import {CommentComponent} from './components/lesson/lesson-detail/comment/comment.component';
import {CommentItemComponent} from './components/lesson/lesson-detail/comment/comment-item/comment-item.component';
import {SettingsComponent} from './components/settings/settings.component';
import {UpgradeComponent} from './components/upgrade/upgrade/upgrade.component';
import { TestEditComponent } from './components/test/test-detail/test-edit/test-edit.component';
import { ListTestComponent } from './components/test/list-test/list-test.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';

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
    TestDetailComponent,
    CreateLessonTestComponent,
    FlashcardComponent,
    FlashcardItemComponent,
    PageNotFoundComponent,
    LessonLearnComponent,
    EditLessonComponent,
    AddQuestionsComponent,
    EditQuestionsComponent,
    ConfirmComponent,
    ItemsComponent,
    LessonLearnItemComponent,
    ShortenTextPipe,
    ConfirmModalComponent,
    HomeItemComponent,
    ReportlessonComponent,
    SettingsComponent,
    UpgradeComponent,
    EditQuestionItemComponent,
    AddQuestionTestComponent,
    DemoScaQuestionComponent,
    DemoMcaQuestionComponent,
    DemoFitbQuestionComponent,
    AddQuestionSearchItemComponent,
    AddQuestionSearchItemQuestionComponent,
    CommentComponent,
    CommentItemComponent,
    TestEditComponent,
    ListTestComponent,
    ThemeToggleComponent,
  ],
  imports: [
    MatSlideToggleModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    NgOptimizedImage,
    NgxBootstrapIconsModule.pick(allIcons, {}),
    NgOptimizedImage,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: PathLocationStrategy,
    },
    // {
    //   provide: IMAGE_LOADER,
    //   useValue: (config: ImageLoaderConfig) => {
    //     return ``;
    //   },
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
