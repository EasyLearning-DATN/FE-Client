import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {allIcons, NgxBootstrapIconsModule} from 'ngx-bootstrap-icons';
import {HttpLoaderFactory} from '../../app.module';
import {ConfirmModalComponent} from '../../components/commons/confirm-modal/confirm-modal.component';
import {ShortenTextPipe} from '../../pipe/shorten-text.pipe';

@NgModule({
  declarations: [
    ShortenTextPipe,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgxBootstrapIconsModule.pick(allIcons, {}),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    CommonModule,
    ShortenTextPipe,
    ConfirmModalComponent,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgxBootstrapIconsModule,
    TranslateModule,

  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
