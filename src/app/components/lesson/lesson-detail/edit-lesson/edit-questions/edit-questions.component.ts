import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {SharedService} from "../../../../../services/shared/shared.service";
import {ModalDismissReasons, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionTypeResponses} from "../../../../../responses/question-type/question-type.responses";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-questions',
  templateUrl: './edit-questions.component.html',
  styleUrls: ['./edit-questions.component.css'],
})
export class EditQuestionsComponent implements OnInit, OnDestroy {

  editQuestionForm!: FormGroup;
  questionTypes!: QuestionTypeResponses[];
  @Input() lessonId!: string;
  private closeResult!: string;

  constructor(private sharedService: SharedService, private modalService: NgbModal, private config: NgbModalConfig) {
  }

  get questionControls() {
    return (this.editQuestionForm.get('questions') as FormArray).controls;
  }

  getAnswerControls(index: number) {
    return (this.questionControls.at(index)?.get('answers') as FormArray).controls;
  }

  ngOnInit() {
    this.questionTypes = this.sharedService.questionTypeResponses;
    // this.initForm();
  }

  ngOnDestroy() {
  }

  changeType(event: Event, index: number) {
    const typeCode = this.questionControls[index].get('question_type_id')?.value;
    (this.editQuestionForm.get('questions') as FormArray).setControl(index, this.changeForm(typeCode));
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
    (this.editQuestionForm.get('questions') as FormArray).push(new FormGroup({
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
    if ((this.editQuestionForm.get('questions') as FormArray).length === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Không thể xóa câu hỏi!',
        text: 'Bài học phải có ít nhất 1 câu hỏi!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } else {

      (this.editQuestionForm.get('questions') as FormArray).removeAt(index);
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
    this.editQuestionForm.value.questions.forEach((question: any) => {
      const type = question.questionTypeId;
      this.questionTypes.forEach((qType: QuestionTypeResponses) => {
        if (qType.code === type) {
          question.questionTypeId = qType.id;
        }
      });
    });
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
    this.editQuestionForm = new FormGroup<any>({
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
