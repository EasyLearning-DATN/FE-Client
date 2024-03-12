import {Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SharedService} from "../../../../../services/shared/shared.service";
import {ModalDismissReasons, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {QuestionTypeResponses} from "../../../../../responses/question-type/question-type.responses";
import Swal from "sweetalert2";
import {QuestionResponses} from "../../../../../responses/question/question.responses";
import {ConfirmModalComponent} from "../../../../commons/confirm-modal/confirm-modal.component";
import {QuestionService} from "../../../../../services/question/question.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionDTO} from "../../../../../DTOS/question/question.dto";

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css'],
})
export class EditQuestionsComponent implements OnInit, OnDestroy {

  questionTypes!: QuestionTypeResponses[];
  questions!: QuestionResponses[];
  @Input() lessonId!: string;
  editQuestionForm!: FormGroup;
  updatedQuestion!: QuestionDTO;
  updateQuestion!: QuestionResponses;
  @ViewChild('closeEditModalButton', {static: true}) closeModal!: ElementRef;
  private closeResult!: string;

  constructor(private sharedService: SharedService, private modalService: NgbModal, private config: NgbModalConfig,
    private questionService: QuestionService) {
  }

  get answerControls() {
    return (this.editQuestionForm.get('answers') as FormArray).controls;
  }

  ngOnInit() {
    this.questionTypes = this.sharedService.questionTypeResponses;
    this.questions = this.sharedService.questionsOfLesson.data;
    this.sharedService.questionsOfLessonChanged.subscribe(
      (questions) => {
        this.questions = questions.data;
      },
    );
  }

  ngOnDestroy() {
  }

  openEditModal(content: TemplateRef<any>, question: QuestionResponses) {
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
    this.initEditForm(question);
  }

  onAddNewFITBAnswer() {
    (this.editQuestionForm.get('answers') as FormArray).push(new FormGroup({
      'value': new FormControl('', Validators.required),
      'is_correct': new FormControl(true),
    }));
  }

  openModal(content: TemplateRef<any>) {
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

  onDeleteQuestion(id: string) {
    if (this.questions.length === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Không thể xóa câu hỏi!',
        text: 'Bài học phải có ít nhất 1 câu hỏi!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } else {

      Swal.fire({
        title: 'Đang xóa câu hỏi...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.questionService.deleteQuestion(id).subscribe(
        (response) => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Xóa câu hỏi thành công!',
            text: 'Bạn đã thành công xóa câu hỏi này!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          this.questionService.getListQuestion(this.lessonId).subscribe(
            response => {
              this.sharedService.questionsOfLessonChanged.next(response);
            }, error => {
              console.log(error);
            });
        }, error => {
          console.log(error);
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Xóa câu hỏi thất bại!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        },
      );

    }

  }

  openConfirmDelete(id: string) {
    const confirmModal = this.modalService.open(ConfirmModalComponent);
    confirmModal.componentInstance.body = "Bạn có chắc chắn muốn xóa câu hỏi khỏi bài học này không?";
    confirmModal
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
          this.onDeleteQuestion(id);
          console.log(result);
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
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
      if (qType.code === this.editQuestionForm.value.question_type_id) {
        this.editQuestionForm.value.question_type_id = qType.id;
      }
    });

    const confirmModal = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    confirmModal.componentInstance.body = "Bạn có chắc chắn muốn chỉnh sửa câu hỏi này không?";
    confirmModal
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
          this.updatedQuestion = this.editQuestionForm.value;
          console.log(this.updatedQuestion);
          Swal.fire({
            title: 'Đang cập nhật câu hỏi...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          this.questionService.updateQuestion(this.updatedQuestion, this.updateQuestion.id).subscribe(
            (response) => {
              console.log(response);
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Cập nhật câu hỏi thành công!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
              this.questionService.getListQuestion(this.lessonId).subscribe(
                response => {
                  this.sharedService.questionsOfLessonChanged.next(response);
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

  initEditForm(question: QuestionResponses) {
    let questionTypeCode = '';
    this.questionTypes.forEach(
      qType => {
        if (qType.id === question.question_type_id) {
          questionTypeCode = qType.code;
        }
      });

    this.editQuestionForm = new FormGroup({
      'title': new FormControl(question.title, Validators.required),
      'weighted': new FormControl(question.weighted, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      'question_type_id': new FormControl(questionTypeCode),
      'answers': this.getAnswersFormArray(question),
      'lesson_id': new FormControl(question.lesson_id),
    });
  }

  getAnswersFormArray(question: QuestionResponses) {
    let answers: FormArray;
    question.answers.forEach(
      answer => {
        answers.push(new FormGroup({
          'value': new FormControl(answer.value, Validators.required),
          'is_correct': new FormControl(answer.value),
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
