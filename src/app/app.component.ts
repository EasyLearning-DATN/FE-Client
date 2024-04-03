import {AfterContentInit, Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SharedService} from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css'],
})
export class AppComponent implements AfterContentInit {
  title = 'FE-Client';
  isDoTest = false;

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (event.ctrlKey && event.key === 'u') {
  //     event.preventDefault();
  //   }
  //   if (event.key === 'F12') {
  //     event.preventDefault();
  //   }
  // }

  // @HostListener('document:contextmenu', ['$event'])
  // onRightClick(event: MouseEvent) {
  //   event.preventDefault();
  // }
  
  constructor(private translate: TranslateService, private sharedService: SharedService) {
    translate.setDefaultLang('vi');
    translate.use('vi');
  }

  ngAfterContentInit() {
    this.sharedService.isDoTest.subscribe(
      res => {
        this.isDoTest = res;
      },
    );
  }


}
