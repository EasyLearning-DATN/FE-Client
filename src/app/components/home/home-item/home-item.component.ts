import {Component, Input} from '@angular/core';
import {TestResponses} from "../../../responses/test/test.responses";
import {SearchLessonResponses} from "../../../responses/search-lesson/search-lesson.responses";

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.css'],
})
export class HomeItemComponent {
  @Input() lesson !: SearchLessonResponses;
  @Input() test !: TestResponses;


}
