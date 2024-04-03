import {Component, inject, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {TRANSLATE} from '../../../../environments/environments';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() title = {value: ''};
  @Input() body = {value: ''};

  constructor(private translate: TranslateService) {
    translate.get(TRANSLATE.MESSAGE.CONFIRM_MODAL.TITLE).subscribe(
      (response: string) => {
        this.title.value = response;
      },
    );
    translate.get(TRANSLATE.MESSAGE.CONFIRM_MODAL.BODY).subscribe(
      (response: string) => {
        this.body.value = response;
      },
    );
  }
}
