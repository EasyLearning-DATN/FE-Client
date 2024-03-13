import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ResultTypeResponses} from "../../../responses/result_type_id/result_type.responses";
import {TestDTO} from "../../../DTOS/test/test.dto";
import {ModalDismissReasons, NgbModal, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {SharedService} from "../../../services/shared/shared.service";
import {TestService} from "../../../services/test/test.service";
import {QuestionResponses} from "../../../responses/question/question.responses";
import {QuestionTypeResponses} from "../../../responses/question-type/question-type.responses";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent implements OnInit, OnDestroy {
  urlImage: any;
  createTestForm!: FormGroup;
  resultTypes!: ResultTypeResponses[];
  createTest!: TestDTO;
  questionIDs!: string[];
  questions!: QuestionResponses[];
  questionTypes!: QuestionTypeResponses[];

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService,
    private modalService: NgbModal, private testService: TestService) {
  }

  ngOnInit() {
    this.resultTypes = this.sharedService.resultType;
    this.questions = this.sharedService.tempTestQuestions;
    this.questionTypes = this.sharedService.questionTypeResponses;
    this.initForm();
  }

  ngOnDestroy() {
    this.sharedService.tempTestQuestions = [];
  }

  resetSelection(selection: string) {
    if (this.createTestForm.get('test_type')?.value !== 'eachQuestion' && selection === 'eachQuestion') {
      this.createTestForm.patchValue({'time_total': 0});
    }
    if (this.createTestForm.get('test_type')?.value !== 'fullTime' && selection === 'fullTime') {
      this.createTestForm.patchValue({'time_question': 0});
    }
  }

  uploadImage(event: any) {
    if (event.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e) => {
        this.urlImage = reader.result;
      };
    } else {
      this.urlImage = null;
    }
  }

  initForm() {
    this.createTestForm = new FormGroup({
      'name': new FormControl("", [Validators.required]),
      'description': new FormControl("", [Validators.required]),
      'time_total': new FormControl("0", [Validators.required]),
      'time_question': new FormControl("0", [Validators.required]),
      'image_id': new FormControl('', [Validators.required]),
      'view_result_type_code': new FormControl(this.resultTypes[0].code, [Validators.required]),
      'test_type': new FormControl("fullTime", [Validators.required]),
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
