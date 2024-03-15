import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {SharedService} from "../../../../../services/shared/shared.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {QuestionTypeResponses} from "../../../../../responses/question-type/question-type.responses";
import Swal from "sweetalert2";
import {ConfirmModalComponent} from "../../../../commons/confirm-modal/confirm-modal.component";
import {QuestionService} from "../../../../../services/question/question.service";
import {QuestionDTO} from "../../../../../DTOS/question/question.dto";
import {LessonService} from "../../../../../services/lesson/lesson.service";

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css'],
})
export class AddQuestionsComponent implements OnInit {

  createQuestionForm!: FormGroup;
  questionTypes!: QuestionTypeResponses[];
  @Input() lessonId!: string;
  listQuestion!: QuestionDTO[];
  private closeResult!: string;

  constructor(private sharedService: SharedService, private modalService: NgbModal, private config: NgbModalConfig,
    private questionService: QuestionService, private lessonService: LessonService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  get questionControls() {
    return (this.createQuestionForm.get('questions') as FormArray).controls;
  }

  getAnswerControls(index: number) {
    return (this.questionControls.at(index)?.get('answers') as FormArray).controls;
  }

  ngOnInit() {
    // this.questionTypes = this.sharedService.questionTypeResponses;
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem("questionTypes"));
    this.initForm();
  }

  changeType(event: Event, index: number) {
    const typeCode = this.questionControls[index].get('question_type_id')?.value;
    (this.createQuestionForm.get('questions') as FormArray).setControl(index, this.changeForm(typeCode));
  }

  openAddQuestions(content: TemplateRef<any>) {
    this.modalService.open(content, {size: 'lg', scrollable: true})
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  onAddNewQuestion() {
    this.setForm();
  }

  getAnswersFormArray(typeCode: string) {
    if (typeCode === 'fitb') {
      return new FormArray([
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(true),
        }),
      ]);
    } else if (typeCode === 'mca') {
      return new FormArray([
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(false),
        }),
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(false),
        }),
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(false),
        }),
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(false),
        }),
      ]);
    } else {
      return new FormArray([
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(false),
        }),
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(false),
        }),
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(false),
        }),
        new FormGroup({
          'value': new FormControl('', Validators.required),
          'is_correct': new FormControl(true),
        }),
      ]);
    }

  }

  setForm() {
    (this.createQuestionForm.get('questions') as FormArray).push(new FormGroup({
      'title': new FormControl(null, Validators.required),
      'weighted': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      'question_type_id': new FormControl('sca', Validators.required),
      'answers': this.getAnswersFormArray('sca'),
    }));
  }

  changeForm(typeCode: string) {
    return new FormGroup({
      'title': new FormControl(null, Validators.required),
      'weighted': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      'question_type_id': new FormControl(typeCode, Validators.required),
      'answers': this.getAnswersFormArray(typeCode),
    });
  }

  onAddNewFITBAnswer(index: number) {
    (this.questionControls.at(index)?.get('answers') as FormArray).push(new FormGroup({
      'value': new FormControl('', Validators.required),
      'is_correct': new FormControl(true),
    }));
  }

  onDeleteQuestion(index: number) {
    if ((this.createQuestionForm.get('questions') as FormArray).length === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Không thể xóa câu hỏi!',
        text: 'Bài học phải có ít nhất 1 câu hỏi!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } else {

      (this.createQuestionForm.get('questions') as FormArray).removeAt(index);
      Swal.fire({
        icon: 'success',
        title: 'Xóa câu hỏi thành công!',
        text: 'Bạn đã thành công xóa câu hỏi này!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }

  }

  openConfirmAdd() {
    if (!this.createQuestionForm.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng nhập đủ thông tin!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }
    this.createQuestionForm.value.questions.forEach((question: any) => {
      const type = question.question_type_id;
      this.questionTypes.forEach((qType: QuestionTypeResponses) => {
        if (qType.code === type) {
          question.question_type_id = qType.id;
        }
      });
    });

    const confirmModal = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    confirmModal.componentInstance.body = "Bạn có chắc chắn muốn thêm câu hỏi vào bài học này không?";
    confirmModal
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
          this.listQuestion = ((this.createQuestionForm.get('questions') as FormArray).value as QuestionDTO[]);
          this.listQuestion.forEach((question: QuestionDTO) => {
            question.lesson_id = this.lessonId;
          });
          console.log(this.listQuestion);
          Swal.fire({
            title: 'Đang thêm câu hỏi...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          this.questionService.putListQuestion(this.listQuestion).subscribe(
            (response) => {
              console.log(response);
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Thêm câu hỏi thành công!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
              this.lessonService.getOneLesson(this.lessonId).subscribe(
                response => {
                  this.sharedService.lessonChanged.next(response);
                }, error => {
                  console.log(error);
                });
              this.initForm();
            }, error => {
              console.log(error);
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: 'Thêm câu hỏi thất bại!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
            },
          );
          console.log(result);
        }

      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  initForm() {
    let questions = new FormArray([
      new FormGroup({
        'title': new FormControl(null, Validators.required),
        'weighted': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
        'question_type_id': new FormControl('sca', Validators.required),
        'answers': this.getAnswersFormArray('sca'),
      }),

    ]);
    this.createQuestionForm = new FormGroup<any>({
      'questions': questions,
    });
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
