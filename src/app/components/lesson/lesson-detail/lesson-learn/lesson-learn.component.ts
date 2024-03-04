import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-lesson-learn',
  templateUrl: './lesson-learn.component.html',
  styleUrls: ['./lesson-learn.component.css'],
})
export class LessonLearnComponent {
  @Input() nameCode: string = "sca";

}
