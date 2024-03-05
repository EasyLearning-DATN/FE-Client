import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-lesson-learn-item',
  templateUrl: './lesson-learn-item.component.html',
  styleUrls: ['./lesson-learn-item.component.css'],
})
export class LessonLearnItemComponent {
  @Input() nameCode: string = "sca";
  isCorrect: boolean = true;
  answers: string[] = ['Answer1', 'Answer2', 'Answer3', 'Answer4'];
}
