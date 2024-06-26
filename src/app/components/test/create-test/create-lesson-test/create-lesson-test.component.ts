import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {TestDTO} from '../../../../DTOS/test/test.dto';
import {LessonResponses} from '../../../../responses/lesson/lesson.responses';
import {QuestionResponses} from '../../../../responses/question/question.responses';
import {ResultTypeResponses} from '../../../../responses/result_type_id/result_type.responses';
import {SharedService} from '../../../../services/shared/shared.service';
import {TestService} from '../../../../services/test/test.service';
import {ConfirmModalComponent} from '../../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-create-lesson-test',
  templateUrl: './create-lesson-test.component.html',
  styleUrls: ['./create-lesson-test.component.css'],
})
export class CreateLessonTestComponent implements OnInit {
  userId = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).id: '';
  role: string = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).role: '';
  numberOfTest: number = 0;
  resultTypes!: ResultTypeResponses[];
  questions!: QuestionResponses[];
  lesson!: LessonResponses;
  createTestForm!: FormGroup;
  createTest!: TestDTO;
  closeResult: string = '';
  maxDate!: Date;
  minDate!: Date;

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService,
              private modalService: NgbModal, private testService: TestService, private router: Router) {
  }


  ngOnInit() {
    // this.resultTypes = this.sharedService.resultType;
    this.getAllTestByUser();
    this.resultTypes = JSON.parse(<string>sessionStorage.getItem('resultTypes'));
    this.questions = this.sharedService.lesson.questions;
    this.lesson = this.sharedService.lesson;
    this.initForm();
    const now = new Date();
    this.minDate = new Date();
    this.minDate.setDate(now.getDate() - 1);
    this.maxDate = new Date();
    this.maxDate.setDate(now.getDate() + 365);
  }

  resetSelection(selection: string) {
    if (this.createTestForm.get('test_type')?.value!=='eachQuestion' && selection==='eachQuestion') {
      this.createTestForm.patchValue({'time_total': 0});
    }
    if (this.createTestForm.get('test_type')?.value!=='fullTime' && selection==='fullTime') {
      this.createTestForm.patchValue({'time_question': 0});
    }
  }

  onCreateTest() {
    if (!this.createTestForm.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng nhập đủ thông tin!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }
    const confirmModal = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    confirmModal.componentInstance.body = {value: 'Bạn có chắc chắn muốn tạo bài kiểm tra không?'};
    confirmModal
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result==='Confirm') {
          this.createTest = {
            name: this.createTestForm.get('name')?.value,
            description: this.createTestForm.get('description')?.value,
            question_ids: this.getRandomQuestions(),
            time_question: this.createTestForm.get('time_question')?.value===0 ? null: this.createTestForm.get('time_question')?.value,
            time_total: this.createTestForm.get('time_total')?.value===0 ? null: this.createTestForm.get('time_total')?.value,
            view_result_type_code: this.createTestForm.get('view_result_type_code')?.value,
            image_id: this.lesson.image.public_id,
            total_question: <number>this.createTestForm.get('total_question')?.value,
            close_time: null,
            open_time: null,
            max_point: null,
            classRoomId: null,
          };
          console.log(this.createTest);
          if (this.numberOfTest > 10 && this.role==='user') {
            Swal.fire({
              icon: 'warning',
              title: 'Chỉ được tạo tối đa 10 bài Kiểm tra! Vui lòng nâng cấp tài khoản để tạo thêm bài kiểm tra',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
            return;
          } else {
            Swal.fire({
              title: 'Đang tạo bài kiểm tra...',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
            });
            this.testService.createTest(this.createTest).subscribe(
              (response: any) => {
                console.log(response);
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Tạo bài kiểm tra mới thành công!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
                this.initForm();
                this.offcanvasService.dismiss();
                this.router.navigate(['test', response.data.id]);
              }, error => {
                console.log(error);
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: 'Tạo bài kiểm tra mới thất bại!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
              },
            );
          }
          console.log(result);
        }

      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  getRandomQuestions(): string[] {
    const randomQuestionsIds: string[] = [];
    const arrayCopy: QuestionResponses[] = [...this.questions]; // Create a copy of the original array
    const testSize = <number>this.createTestForm.get('total_question')?.value;
    for (let i = 0; i < testSize; i++) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      const randomElement = arrayCopy.splice(randomIndex, 1)[0];
      randomQuestionsIds.push(randomElement.id);
    }
    return randomQuestionsIds;
  }

  openOffcanvas(content: TemplateRef<any>) {
    const token = localStorage.getItem('token') || '';
    if (token==='') {
      if (!this.createTestForm.valid) {
        Swal.fire({
          icon: 'warning',
          title: 'Vui lòng đăng nhập để làm kiểm tra!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        return;
      }
    }
    this.offcanvasService.open(content,
      {
        backdrop: 'static',
        position: 'end',
      },
    );
  }

  initForm() {
    this.createTestForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'time_total': new FormControl(0, [Validators.required]),
      'time_question': new FormControl(0, [Validators.required]),
      'image_id': new FormControl(this.lesson.image.url, [Validators.required]),
      'view_result_type_code': new FormControl(this.resultTypes[0].code, [Validators.required]),
      'total_question': new FormControl(1, [Validators.required]),
      'test_type': new FormControl('fullTime', [Validators.required]),
      'isHasOpenTime': new FormControl(false),
      'isHasCloseTime': new FormControl(false),
      'open_time': new FormControl(new Date(), [Validators.required]),
      'close_time': new FormControl(new Date(), [Validators.required]),
    });
  }

  // closePicker() {
  //   this.picker.cancel();
  // }

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

  private getAllTestByUser() {
    this.testService.getTestByUser(this.userId).subscribe(
      (response) => {
        this.numberOfTest = response.length;
      }, error => {
        console.log(error);
      },
    );
  }
}
