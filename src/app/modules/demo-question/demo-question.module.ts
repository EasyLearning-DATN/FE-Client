import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app.module";
import { DemoFitbQuestionComponent } from "src/app/components/test/create-test/demo-fitb-question/demo-fitb-question.component";
import { DemoMcaQuestionComponent } from "src/app/components/test/create-test/demo-mca-question/demo-mca-question.component";
import { DemoScaQuestionComponent } from "src/app/components/test/create-test/demo-sca-question/demo-sca-question.component";

@NgModule({
    declarations: [
        DemoFitbQuestionComponent,
        DemoMcaQuestionComponent,
        DemoScaQuestionComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
        },
        }),
    ],
    exports: [
        DemoFitbQuestionComponent,
        DemoMcaQuestionComponent,
        DemoScaQuestionComponent,
        CommonModule,
        NgbModule,
        FormsModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        TranslateModule,
    ]
})
export class DemoQuestionModule {
    constructor(library: FaIconLibrary) {
    //     library.addIcons({
    //         '':'
    //     });
    library.addIconPacks(fas);
      }
}