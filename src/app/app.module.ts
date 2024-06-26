import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CookieService} from 'ngx-cookie-service';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeItemComponent} from './components/home/home-item/home-item.component';
import {HomeComponent} from './components/home/home.component';
import {FunnyWheelsComponent} from './components/minigame/FunnyWheels/funny-wheels/funny-wheels.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {LangInterceptor} from './interceptors/lang.interceptor';
import {SharedModule} from './modules/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';

// const MY_NGX_DATE_FORMATS: NgxMatDateFormats = {
//   parse: {
//     dateInput: 'l, LTS',
//   },
//   display: {
//     dateInput: 'DD.MM.yyyy HH:mm',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HomeItemComponent,
    PageNotFoundComponent
  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'vi',
    }),

  ],
  providers: [
    {
      provide: LocationStrategy, useClass: PathLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: LangInterceptor,
    },
    // {
    //   provide: IMAGE_LOADER,
    //   useValue: (config: ImageLoaderConfig) => {
    //     return ``;
    //   },
    // },
    CookieService,
    // {
    //   provide: NgxMatDateAdapter,
    //   useClass: NgxMatMomentAdapter, //Moment adapter
    //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    // },
    // {provide: NGX_MAT_DATE_FORMATS, useValue: MY_NGX_DATE_FORMATS},
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


