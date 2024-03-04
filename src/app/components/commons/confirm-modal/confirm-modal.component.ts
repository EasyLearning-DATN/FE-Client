import {Component, inject, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() title: string = "Xác nhận";
  @Input() body: string = "Bạn có chắc chắn muốn thay đổi không?";
}
