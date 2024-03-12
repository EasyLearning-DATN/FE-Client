import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LessonResponses } from 'src/app/responses/lesson/lesson.responses';
import { LessonsResponses } from 'src/app/responses/lessons/lessons.responses';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent {
  
}
