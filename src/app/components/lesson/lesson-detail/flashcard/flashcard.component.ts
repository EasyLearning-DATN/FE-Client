import {Component} from '@angular/core';

@Component({
    selector: 'app-flashcard',
    templateUrl: './flashcard.component.html',
    styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent {
    size = 3;
    index = 1;
    items: number[] = [1, 2, 3];

    increase() {
        if (this.index < this.size) {
            this.index++;
        } else {
            this.index = 1;
        }
    }

    reduce() {
        if (this.index > 1) {
            this.index--;
        } else {
            this.index = this.size;
        }
    }
}
