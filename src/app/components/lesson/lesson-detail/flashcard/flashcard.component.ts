import {Component} from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-flashcard',
    templateUrl: './flashcard.component.html',
    styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent {
    size = 3;
    index = 1;
    items: number[] = [1, 2, 3];

    constructor(private carouselConfig: NgbCarouselConfig) {
        carouselConfig.interval = 0;
    }

}
