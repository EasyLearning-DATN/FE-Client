import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {QuestionDTO} from '../../../../../../DTOS/question/question.dto';
import {QuestionTypeResponses} from '../../../../../../responses/question-type/question-type.responses';
import {QuestionResponses} from '../../../../../../responses/question/question.responses';
import {LessonService} from '../../../../../../services/lesson/lesson.service';
import {QuestionService} from '../../../../../../services/question/question.service';
import {SharedService} from '../../../../../../services/shared/shared.service';
import {ConfirmModalComponent} from '../../../../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-edit-question-item',
  templateUrl: './edit-question-item.component.html',
  styleUrls: ['./edit-question-item.component.css'],
})
export class EditQuestionItemComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() question!: QuestionResponses;
  @Input() lessonId!: string;
  @Input() questionTypes!: QuestionTypeResponses[];
  editQuestionForm!: FormGroup;
  updatedQuestion!: QuestionDTO;
  @ViewChild('closeEditModalButton', {static: true}) closeModal!: ElementRef;
  private closeResult!: string;

  constructor(private sharedService: SharedService, private questionService: QuestionService, private modalService: NgbModal,
              private lessonService: LessonService) {
  }

  get answerControls() {
    return (this.editQuestionForm.get('answers') as FormArray).controls;
  }

  ngOnInit() {
    this.initEditForm();
  }

  onAddNewFITBAnswer() {
    (this.editQuestionForm.get('answers') as FormArray).push(new FormGroup({
      'value': new FormControl('', Validators.required),
      'is_correct': new FormControl(true),
    }));
  }

  openConfirmEdit() {
    if (!this.editQuestionForm.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng nhập đủ thông tin!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.questionTypes.forEach((qType: QuestionTypeResponses) => {
      if (qType.code===this.editQuestionForm.value.question_type_id) {
        this.editQuestionForm.value.question_type_id = qType.id;
      }
    });

    const confirmModal = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    confirmModal.componentInstance.body = 'Bạn có chắc chắn muốn chỉnh sửa câu hỏi này không?';
    confirmModal
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result==='Confirm') {
          this.updatedQuestion = this.editQuestionForm.value;
          this.updatedQuestion.lesson_id = this.lessonId;
          this.updatedQuestion.weighted = Number.parseFloat(String(this.updatedQuestion.weighted));
          // console.log(this.updatedQuestion);
          Swal.fire({
            title: 'Đang cập nhật câu hỏi...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          this.questionService.updateQuestion(this.updatedQuestion, this.question.id).subscribe(
            (response) => {
              console.log(response);
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Cập nhật câu hỏi thành công!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
              this.lessonService.getOneLesson(this.lessonId).subscribe(
                response => {
                  this.sharedService.lessonChanged.next(response);
                }, error => {
                  console.log(error);
                });
              this.closeModal.nativeElement.click();
            }, error => {
              console.log(error);
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: 'Cập nhật câu hỏi thất bại!',
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

  initEditForm() {
    let questionTypeCode = '';
    this.questionTypes.forEach(
      qType => {
        if (qType.id===this.question.question_type_id) {
          questionTypeCode = qType.code;
        }
      });
    this.editQuestionForm = new FormGroup({
      'title': new FormControl(this.question.title, Validators.required),
      'weighted': new FormControl(this.question.weighted, [
        Validators.required,
        Validators.min(1),
        Validators.max(3),
      ]),
      'question_type_id': new FormControl(questionTypeCode),
      'answers': this.getAnswersFormArray(this.question),
      'lesson_id': new FormControl(this.lessonId),
      'description': new FormControl(''),
    });
  }

  getAnswersFormArray(question: QuestionResponses) {
    let answers: FormArray = new FormArray<any>([]);
    question.answers.forEach(
      answer => {
        answers.push(new FormGroup({
          'value': new FormControl(answer.value, Validators.required),
          'is_correct': new FormControl(answer.is_correct),
        }));
      });
    // @ts-ignore
    return answers;
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
