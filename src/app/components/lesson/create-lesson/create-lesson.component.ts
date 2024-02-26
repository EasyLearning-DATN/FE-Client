import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent {
  createLessonF: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createLessonF = this.fb.group({
      title: [''],
      description: [''],
      image: [''],
      questions: this.fb.array([
        this.createQuestionFormGroup()
      ])
    });
  }

  createQuestionFormGroup(): FormGroup {
    return this.fb.group({
      question: [''],
      answerA: [''],
      answerB: [''],
      answerC: [''],
      correctAnswer: ['']
    });
  }

  get questionForms() {
    return this.createLessonF.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questionForms.push(this.createQuestionFormGroup());
  }

  onCreateLesson(): void {
    // thông báo tạo bài học thành công
    console.log(this.createLessonF.value);
  }

  onFileSelected() {
    
}

}
