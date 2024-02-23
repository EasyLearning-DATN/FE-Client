import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css']
})
export class AppComponent {
  title = 'FE-Client';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('vi');
    translate.use('vi');
  }
}
