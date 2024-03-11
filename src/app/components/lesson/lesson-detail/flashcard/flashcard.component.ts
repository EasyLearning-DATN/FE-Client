import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {QuestionResponses} from "../../../../responses/question/question.responses";
import {SharedService} from "../../../../services/shared/shared.service";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css'],
})
export class FlashcardComponent implements OnInit {
  questions!: QuestionResponses[];


  constructor(private carouselConfig: NgbCarouselConfig, private sharedService: SharedService) {
    carouselConfig.interval = 0;
  }

  ngOnInit() {
    // lấy câu hỏi từ shared service
    this.questions = this.sharedService.questionsOfLesson.data;
    this.sharedService.questionsOfLessonChanged.subscribe(
      (questions) => {
        this.questions = questions.data;
      },
    );

  }

}
