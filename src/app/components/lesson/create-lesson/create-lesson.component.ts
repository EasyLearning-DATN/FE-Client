import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LessonDTO} from 'src/app/DTOS/lesson/lesson.dto';
import {ImageResponses} from 'src/app/responses/image/image.responses';
import {LessonService} from 'src/app/services/lesson/lesson.service';
import {QuestionService} from 'src/app/services/question/question.service';
import {UploadImageService} from 'src/app/services/shared/upload/upload-image.service';
import {environment, TRANSLATE} from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css'],
})
export class CreateLessonComponent implements OnInit {
  @ViewChild('lessonForm') lessonForm!: NgForm;
  listQuestionImport: any[] = [];
  // listQuestionImport: QuestionDTO[] = [];
  numberOfLesson: number = 0;
  userId: string = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).id: '';
  role: string = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).role: '';
  name: string = '';
  description: string = '';
  image_id: string = '';
  createLessonF: FormGroup;
  lessonF: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    image_id: new FormControl(''),
    is_public: new FormControl(''),
  });
  protected readonly environment = environment;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private lessonService: LessonService,
    private imgUpload: UploadImageService,
    private router: Router,
    private translateService: TranslateService) {
    this.createLessonF = this.fb.group({
      title: [''],
      description: [''],
      image: [''],
      questions: this.fb.array([
        this.createQuestionFormGroup(),
      ]),
    });
  }

  get questionForms() {
    return this.createLessonF.get('questions') as FormArray;
  }

  ngOnInit(): void {
    this.getAllLesson();
  }

  createQuestionFormGroup(): FormGroup {
    return this.fb.group({
      question: [''],
      answerA: [''],
      answerB: [''],
      answerC: [''],
      correctAnswer: [''],
    });
  }

  addQuestion(): void {
    this.questionForms.push(this.createQuestionFormGroup());
  }

  onCreateLesson() {
    let title = '';
    this.translateService.get(TRANSLATE.MESSAGE.PROGRESS.CREATE_LESSON_001).subscribe(
      res => {
        title = res;
      },
    );
    Swal.fire({
      title: title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.imgUpload.uploadImage(this.image_id, localStorage.getItem('token')).subscribe(
      (res: ImageResponses) => {
        this.image_id = res.public_id;
        console.log(res.public_id);
        this.createLesson();
      }, error => {
        console.log(error);
      });
  }

  // tạo list question mới apiCreateListQuestion questionService gán vào QuestionResponses
  createListQuestion() {
    this.questionService.putListQuestion(this.listQuestionImport).subscribe(
      (response: any) => {
        console.log(response);
        let title = '';
        this.translateService.get(TRANSLATE.MESSAGE.SUCCESS.CREATE_LESSON_001).subscribe(
          res => {
            title = res;
          },
        );
        Swal.fire({
          icon: 'success',
          title: title,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/lesson/list-lesson/my-lesson']);
          }
        });
      }, error => {
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      },
    );
  }

  // tạo lesson mới apiCreateLesson lessonService
  createLesson() {
    if (this.lessonForm.valid) {
      const LessonDTO: LessonDTO = {
        name: this.name,
        description: this.description,
        image_id: this.image_id,
      };
      if (this.numberOfLesson > 10 && this.role==='user') {
        let title = '';
        this.translateService.get(TRANSLATE.MESSAGE.ERROR.CREATE_LESSON_001).subscribe(
          res => {
            title = res;
          },
        );
        Swal.fire({
          icon: 'error',
          title: title,
          showConfirmButton: true,
        });
      } else {
        this.lessonService.createLesson(LessonDTO).subscribe(
          (data) => {
            this.listQuestionImport.forEach((question) => {
              question.lesson_id = data.data.id;
            });
            this.createListQuestion();
          },
          error => {
            console.log(error);
            let title = '';
            this.translateService.get(TRANSLATE.MESSAGE.ERROR.CREATE_LESSON_002).subscribe(
              res => {
                title = res;
              },
            );
            Swal.fire({
              icon: 'error',
              title: title,
              text: error.error.message,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
          },
        );
      }
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image_id = event.target.files[0];
    }
  }

  getAllLesson() {
    if (this.userId) {
      this.lessonService.getListLessonByUser(this.userId).subscribe(
        data => {
          // gán size() cho numberOfLesson
          this.numberOfLesson = data.data.length;
        },
        error => {
          console.log(error);
        },
      );
    }
  }

  // get question after onFileSelected($event)
  onFileSelectedQuestion(event: any) {
    this.questionService.importQuestion(event.target.files[0]).subscribe(
      (res: any) => {
        this.listQuestionImport = res.data;
        console.log(res.data);
      },
      err => {
        console.log(err);
      },
    );
  }

}
