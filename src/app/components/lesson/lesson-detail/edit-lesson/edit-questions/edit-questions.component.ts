import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {SharedService} from "../../../../../services/shared/shared.service";
import {ModalDismissReasons, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {QuestionTypeResponses} from "../../../../../responses/question-type/question-type.responses";
import Swal from "sweetalert2";
import {QuestionResponses} from "../../../../../responses/question/question.responses";
import {ConfirmModalComponent} from "../../../../commons/confirm-modal/confirm-modal.component";
import {QuestionService} from "../../../../../services/question/question.service";
import {EditQuestionItemComponent} from "./edit-question-item/edit-question-item.component";
import {LessonService} from "../../../../../services/lesson/lesson.service";

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css'],
})
export class EditQuestionsComponent implements OnInit, OnDestroy {

  questionTypes!: QuestionTypeResponses[];
  questions!: QuestionResponses[];
  @Input() lessonId!: string;
  // editQuestionForm!: FormGroup;
  // updatedQuestion!: QuestionDTO;
  // updateQuestion!: QuestionResponses;
  private closeResult!: string;

  constructor(private sharedService: SharedService, private modalService: NgbModal, private config: NgbModalConfig,
    private questionService: QuestionService, private lessonService: LessonService) {
  }


  ngOnInit() {
    // this.questionTypes = this.sharedService.questionTypeResponses;
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem("questionTypes"));
    this.questions = this.sharedService.lesson.questions;
    this.sharedService.lessonChanged.subscribe(
      (lesson) => {
        this.questions = lesson.questions;
      },
    );
  }

  ngOnDestroy() {
  }

  openEditModal(question: QuestionResponses) {
    const editModal = this.modalService.open(EditQuestionItemComponent, {size: 'lg', scrollable: true});
    editModal.componentInstance.question = question;
    editModal.componentInstance.questionTypes = this.questionTypes;
    editModal.componentInstance.lessonId = this.lessonId;
    editModal
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
          this.lessonService.getOneLesson(this.lessonId).subscribe(
            response => {
              this.sharedService.lessonChanged.next(response);
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
