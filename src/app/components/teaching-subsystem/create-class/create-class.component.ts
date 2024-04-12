import {Component} from '@angular/core';
import {environment} from '../../../../environments/environments';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css'],
})
export class CreateClassComponent {

  protected readonly environment = environment;
}
