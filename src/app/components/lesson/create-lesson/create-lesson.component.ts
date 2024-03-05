import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LessonDTO } from 'src/app/DTOS/lesson/lesson.dto';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent {
  @ViewChild('lessonForm') lessonForm!: NgForm;
  name: string = '';
  description: string = '';
  image_url: string = '';
  createLessonF: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    private router: Router) {
    this.createLessonF = this.fb.group({
      title: [''],
      description: [''],
      image: [''],
      questions: this.fb.array([
        this.createQuestionFormGroup()
      ])
    });
  }

  lessonF: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image_url: new FormControl(''),
    is_public: new FormControl('')
  });

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

  // tạo lesson mới apiCreateLesson lessonService
  onCreateLesson() {
    if (this.lessonForm.valid) {
      const LessonDTO: LessonDTO = {
        name: this.name,
        description: this.description,
        image_url: this.image_url
      }
      this.lessonService.createLesson(LessonDTO).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Tạo bài học thành công!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/list-lesson']);
            }
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  onFileSelected() {

  }

}
