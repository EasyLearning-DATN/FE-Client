import {Component, Input} from '@angular/core';
import {QuestionResponses} from "../../../../responses/question/question.responses";

@Component({
  selector: 'app-do-test-fitb-item',
  templateUrl: './do-test-fitb-item.component.html',
  styleUrls: ['./do-test-fitb-item.component.css'],
})
export class DoTestFitbItemComponent {
  @Input() question!: QuestionResponses;
  @Input() index!: number;
  @Input() total!: number;
}
