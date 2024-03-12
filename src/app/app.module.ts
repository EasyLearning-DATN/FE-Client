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
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import {ConfirmComponent} from './components/forget-password/confirm/confirm.component';
import {ItemsComponent} from './components/lesson/items/items.component';
import {LessonLearnItemComponent} from './components/lesson/lesson-detail/lesson-learn/lesson-learn-item/lesson-learn-item.component';
import {ShortenTextPipe} from './pipe/shorten-text.pipe';
import {ConfirmModalComponent} from './components/commons/confirm-modal/confirm-modal.component';
import {HomeItemComponent} from './components/home/home-item/home-item.component';
import {ReportlessonComponent} from "./components/lesson/reportlesson/reportlesson.component";
import { EditQuestionItemComponent } from './components/lesson/lesson-detail/edit-lesson/edit-questions/edit-question-item/edit-question-item.component';
import { UpgradeComponent } from './components/upgrade/upgrade/upgrade.component';

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
    UpgradeComponent,
    EditQuestionItemComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    NgOptimizedImage,
    NgxBootstrapIconsModule.pick(allIcons, {}),
    NgOptimizedImage,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
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
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('46624841666-rhb1ravu863ip9b1i1k572ujfpvaqijb.apps.googleusercontent.com'),
          }
          ,
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider("240925951497184"),
          },
        ],
      } as SocialAuthServiceConfig,
    },
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
