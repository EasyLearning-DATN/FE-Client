import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {TestDTO} from '../../../DTOS/test/test.dto';
import {QuestionTypeResponses} from '../../../responses/question-type/question-type.responses';
import {QuestionResponses} from '../../../responses/question/question.responses';
import {ResultTypeResponses} from '../../../responses/result_type_id/result_type.responses';
import {SharedService} from '../../../services/shared/shared.service';
import {UploadImageService} from '../../../services/shared/upload/upload-image.service';
import {TestService} from '../../../services/test/test.service';
import {ConfirmModalComponent} from '../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent implements OnInit, OnDestroy {
  userId = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).id: '';
  role: string = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!).role: '';
  numberOfTest: number = 0;
  urlImage: any;
  createTestForm!: FormGroup;
  resultTypes!: ResultTypeResponses[];
  createTest!: TestDTO;
  questionIDs: string[] = [];
  questions: QuestionResponses[] = [];
  questionTypes!: QuestionTypeResponses[];
  questionSub!: Subscription;
  closeResult: string = '';
  @ViewChild('fileUpload', {static: true}) fileUpload !: ElementRef;

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService,
              private modalService: NgbModal, private testService: TestService, private imageService: UploadImageService, private router: Router) {
  }

  ngOnInit() {
    // this.resultTypes = this.sharedService.resultType;
    this.getAllTestByUser();
    this.resultTypes = JSON.parse(<string>sessionStorage.getItem('resultTypes'));
    // this.questionTypes = this.sharedService.questionTypeResponses;
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem('questionTypes'));
    this.setQuestions();
    this.initForm();
  }

  ngOnDestroy() {
    this.questionSub.unsubscribe();
    this.sharedService.questionsOfCreatingTest = [];
    this.sharedService.tempTestQuestions = [];
  }

  resetSelection(selection: string) {
    if (this.createTestForm.get('test_type')?.value!=='eachQuestion' && selection==='eachQuestion') {
      this.createTestForm.patchValue({'time_total': 0});
    }
    if (this.createTestForm.get('test_type')?.value!=='fullTime' && selection==='fullTime') {
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
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'time_total': new FormControl(0),
      'time_question': new FormControl(0),
      'view_result_type_code': new FormControl(this.resultTypes[0].code, [Validators.required]),
      'test_type': new FormControl('fullTime', [Validators.required]),
    });
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
    confirmModal.componentInstance.body = 'Bạn có chắc chắn muốn tạo bài test không?';
    confirmModal
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result==='Confirm') {

          const token = localStorage.getItem('token');
          Swal.fire({
            title: 'Đang tạo bài test...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          let imgFile = this.fileUpload.nativeElement.files[0];
          // console.log(imgFile);
          // if (imgFile === undefined) {
          //
          //   new FileSystemDirectoryEntry().getFile('/assets/img/gallery/hero-header.png', undefined, result => {
          //     imgFile = result;
          //   });
          //   // imgFile = new File( FileReader(), '/assets/img/gallery/hero-header.png');
          // }
          // console.log(imgFile);
          this.setQuestionIds();
          console.log(this.questionIDs);
          this.imageService.uploadImage(imgFile, token).subscribe(result => {
            this.createTest = {
              name: this.createTestForm.get('name')?.value,
              description: this.createTestForm.get('description')?.value,
              question_ids: this.questionIDs,
              time_question: this.createTestForm.get('time_question')?.value===0 ? null: this.createTestForm.get('time_question')?.value,
              time_total: this.createTestForm.get('time_total')?.value===0 ? null: this.createTestForm.get('time_total')?.value,
              view_result_type_code: this.createTestForm.get('view_result_type_code')?.value,
              image_id: result.public_id,
              total_question: this.questionIDs.length,
            };
            console.log(this.createTest);
            if (this.numberOfTest > 10 && this.role==='user') {
              Swal.fire({
                icon: 'error',
                title: 'Số lượng bài test tối đa là 10! Vui lòng nâng cấp tài khoản để tạo thêm bài test!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
              return;
            } else {
              this.testService.createTest(this.createTest).subscribe(
                (response: any) => {
                  console.log(response);
                  Swal.close();
                  Swal.fire({
                    icon: 'success',
                    title: 'Tạo bài test mới thành công!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  });
                  this.router.navigate(['test', response.data.id]);

                }, error => {
                  console.log(error);
                  Swal.close();
                  Swal.fire({
                    icon: 'error',
                    title: 'Tạo bài test mới thất bại!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK',
                  });
                },
              );
            }
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
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  private setQuestionIds() {
    this.questionIDs = [];
    this.questionIDs.push(...this.questions.map(q => {
      return q.id;
    }));
  }

  private setQuestions() {
    this.questionSub = this.sharedService.questionsOfTestChanged.subscribe(questions => {
      this.questions = questions;
      console.log(this.questions);
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

  private getAllTestByUser() {
    this.testService.getTestByUser(this.userId).subscribe(
      (response) => {
        this.numberOfTest = response.length;
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
