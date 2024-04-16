import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {environment} from '../../../../../environments/environments';
import {TestDTO} from '../../../../DTOS/test/test.dto';
import {QuestionTypeResponses} from '../../../../responses/question-type/question-type.responses';
import {QuestionResponses} from '../../../../responses/question/question.responses';
import {ResultTypeResponses} from '../../../../responses/result_type_id/result_type.responses';
import {TestResponses} from '../../../../responses/test/test.responses';
import {SharedService} from '../../../../services/shared/shared.service';
import {UploadImageService} from '../../../../services/shared/upload/upload-image.service';
import {TestService} from '../../../../services/test/test.service';
import {ConfirmModalComponent} from '../../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css'],
})
export class TestEditComponent implements OnInit, OnDestroy {

  urlImage: any = null;
  test!: TestResponses;
  editTestForm!: FormGroup;
  resultTypes!: ResultTypeResponses[];
  editTest!: TestDTO;
  questionIDs: string[] = [];
  questions!: QuestionResponses[];
  questionTypes!: QuestionTypeResponses[];
  questionSub!: Subscription;
  closeResult: string = '';
  maxDate!: Date;
  minDate!: Date;
  @ViewChild('fileUpload', {static: true}) fileUpload !: ElementRef;
  protected readonly environment = environment;

  constructor(private sharedService: SharedService,
              private modalService: NgbModal, private testService: TestService, private imageService: UploadImageService, private router: Router) {
  }

  ngOnInit() {
    this.sharedService.testChanged.subscribe(
      res => {
        this.sharedService.test = res;
        this.test = this.sharedService.test;
        this.setQuestions();
        this.initForm();
      },
    );
    this.test = this.sharedService.test;
    // this.resultTypes = this.sharedService.resultType;
    this.resultTypes = JSON.parse(<string>sessionStorage.getItem('resultTypes'));
    // this.questionTypes = this.sharedService.questionTypeResponses;
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem('questionTypes'));
    this.setQuestions();
    this.initForm();
  }

  ngOnDestroy() {
    this.questionSub.unsubscribe();
    this.sharedService.questionsOfCreatingTest = [];
  }

  resetSelection(selection: string) {
    if (this.editTestForm.get('test_type')?.value!=='eachQuestion' && selection==='eachQuestion') {
      this.editTestForm.patchValue({'time_total': 0});
    }
    if (this.editTestForm.get('test_type')?.value!=='fullTime' && selection==='fullTime') {
      this.editTestForm.patchValue({'time_question': 0});
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

  onEditTest() {
    if (!this.editTestForm.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng nhập đủ thông tin!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (this.questions.length===0) {
      Swal.fire({
        icon: 'warning',
        title: 'Bài test phải có ít nhất 1 câu hỏi!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }

    const confirmModal = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    confirmModal.componentInstance.body = 'Bạn có chắc chắn muốn lưu chỉnh sửa không?';
    confirmModal
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result==='Confirm') {
          const token = localStorage.getItem('token');
          let imgFile = this.fileUpload.nativeElement.files[0];
          this.setQuestionIds();
          this.editTest = {
            name: this.editTestForm.get('name')?.value,
            description: this.editTestForm.get('description')?.value,
            question_ids: this.questionIDs,
            time_question: this.editTestForm.get('time_question')?.value===0 ? null: this.editTestForm.get('time_question')?.value,
            time_total: this.editTestForm.get('time_total')?.value===0 ? null: this.editTestForm.get('time_total')?.value,
            view_result_type_code: this.editTestForm.get('view_result_type_code')?.value,
            image_id: '',
            total_question: <number>this.editTestForm.get('total_question')?.value,
            open_time: this.editTestForm.get('isHasOpenTime')?.value ? this.editTestForm.get('open_time')?.value: null,
            close_time: this.editTestForm.get('isHasCloseTime')?.value ? this.editTestForm.get('close_time')?.value: null,
            classRoomId: null,
          };
          this.removeSeconds();
          this.changeTime();
          if (this.editTest.close_time && this.editTest.open_time && this.editTest.open_time.getTime() >= this.editTest.close_time.getTime()) {
            Swal.fire({
              icon: 'error',
              title: 'Thời gian mở bài test không được muộn hơn thời gian đóng bài test!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
            return;
          }
          Swal.fire({
            title: 'Đang chỉnh sửa bài test...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          if (this.urlImage===null) {
            this.editTest.image_id = this.test.image.public_id;
            this.testService.updateTest(this.test.id, this.editTest).subscribe(
              (response) => {
                console.log(response);
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Chỉnh sửa bài test thành công!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
                // this.initForm();
              }, error => {
                console.log(error);
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: 'Chỉnh sửa bài test thất bại!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
              },
            );
            console.log(result);
          } else {
            this.imageService.uploadImage(imgFile, token).subscribe(result => {
              this.editTest.image_id = result.public_id;
              // console.log(this.editTest);
              this.testService.updateTest(this.test.id, this.editTest).subscribe(
                (response) => {
                  console.log(response);
                  Swal.close();
                  Swal.fire({
                    icon: 'success',
                    title: 'Chỉnh sửa bài test thành công!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  });
                  this.testService.getOneTest(this.test.id).subscribe(
                    (res) => {
                      this.sharedService.testChanged.next(res);
                    },
                  );
                }, error => {
                  console.log(error);
                  Swal.close();
                  Swal.fire({
                    icon: 'error',
                    title: 'Chỉnh sửa bài test thất bại!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  });
                },
              );
              console.log(result);
            }, error => {
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: 'Vui lòng chọn hình ảnh!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
            });
          }
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  onDeleteTest() {
    const confirmModal = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    confirmModal.componentInstance.body = 'Bạn có chắc chắn muốn xóa bài test này không?';
    confirmModal
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result==='Confirm') {

          const token = localStorage.getItem('token');
          Swal.fire({
            title: 'Đang xóa bài test...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          this.testService.deleteTest(this.test.id).subscribe(
            (response) => {
              console.log(response);
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: 'Xóa bài test thành công!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
              this.router.navigate(['/test/list-test']);
            }, error => {
              console.log(error);
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: 'Xóa bài test thất bại!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
            },
          );
        }
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  private initForm() {
    this.editTestForm = new FormGroup({
      'name': new FormControl(this.test.name, [Validators.required]),
      'description': new FormControl(this.test.description, [Validators.required]),
      'time_total': new FormControl(this.test.time_total ?? 0),
      'time_question': new FormControl(this.test.time_question ?? 0),
      'view_result_type_code': new FormControl(this.test.view_result_type_id.code, [Validators.required]),
      'test_type': new FormControl(this.test.time_total ? 'fullTime': 'eachQuestion', [Validators.required]),
      'isHasOpenTime': new FormControl(!!this.test.open_time),
      'isHasCloseTime': new FormControl(!!this.test.close_time),
      'open_time': new FormControl(this.test.open_time ? this.test.open_time: new Date(), [Validators.required]),
      'close_time': new FormControl(this.test.close_time ? this.test.close_time: (this.test.open_time ? new Date(this.test.open_time.getTime() + 120 * 60 * 1000): new Date(new Date().getTime() + 120 * 60 * 1000)), [Validators.required]),
    });
  }

  private setQuestionIds() {
    this.questionIDs.push(...this.questions.map(q => {
      return q.id;
    }));
    // console.log(this.questionIDs);
  }

  private setQuestions() {
    this.sharedService.questionsOfCreatingTest = [...this.test.question_tests];
    this.questionSub = this.sharedService.questionsOfTestChanged.subscribe(questions => {
      this.questions = questions;
      console.log('question: ' + this.questions);
    });
    this.questions = [...this.test.question_tests];
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

  private removeSeconds() {
    if (this.editTest.open_time) {
      this.editTest.open_time = new Date(new Date(this.editTest.open_time).setSeconds(0));
    }
    if (this.editTest.close_time) {
      this.editTest.close_time = new Date(new Date(this.editTest.close_time).setSeconds(0));
    }
  }

  private changeTime() {
    if (this.editTest.open_time) {
      this.editTest.open_time = new Date(this.editTest.open_time.getTime() + 7 * 60 * 60 * 1000);
    }
    if (this.editTest.close_time) {
      this.editTest.close_time = new Date(this.editTest.close_time.getTime() + 7 * 60 * 60 * 1000);
    }
  }
}
