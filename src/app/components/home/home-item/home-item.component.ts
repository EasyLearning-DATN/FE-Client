import {Component, Input} from '@angular/core';
import {LessonResponses} from "../../../responses/lesson/lesson.responses";
import {TestResponses} from "../../../responses/test/test.responses";

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css'],
})
export class HomeItemComponent {
  @Input() lesson !: LessonResponses;
  @Input() test !: TestResponses;


}
