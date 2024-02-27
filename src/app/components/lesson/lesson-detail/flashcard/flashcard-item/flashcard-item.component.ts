import {Component, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-flashcard-item',
    templateUrl: './flashcard-item.component.html',
    styleUrls: ['./flashcard-item.component.css'],
    animations: [
        trigger('flipState', [
            state('active', style({
                transform: 'rotateY(180deg)'
            })),
            state('inactive', style({
                transform: 'rotateY(0)'
            })),
            transition('active => inactive', animate('500ms ease-out')),
            transition('inactive => active', animate('500ms ease-in'))
        ])
    ]
})
export class FlashcardItemComponent {
    isFlipped = false;

    flip: string = 'inactive';

    constructor() {

    }

    onFlip() {
        this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    }

    toggleFlip() {
        this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    }
}
