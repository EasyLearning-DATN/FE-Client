import { NgxMatTimepickerModule, NgxMatDatetimePickerModule, NgxMatNativeDateModule } from "@angular-material-components/datetime-picker";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { TeachingSubsystemComponent } from "src/app/components/teaching_subsystem/teaching-subsystem/teaching-subsystem.component";
import { DemoQuestionModule } from "../demo-question/demo-question.module";
import { SharedModule } from "../shared/shared.module";
import { TeachingSubsystemRoutingModule } from "./teaching_subsystem-routing.module";

@NgModule({
    declarations: [
        TeachingSubsystemComponent,
    ],
    imports: [
        TeachingSubsystemRoutingModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatButtonModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        DemoQuestionModule,
        SharedModule,
    ],
})
export class TeachingSubsystemModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far, fab);
    }
}
