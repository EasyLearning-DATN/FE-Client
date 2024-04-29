import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDismissReasons, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {environment} from '../../../../environments/environments';
import {TestDTO} from '../../../DTOS/test/test.dto';
import {ClassroomResponses} from '../../../responses/classroom/classroom.responses';
import {QuestionTypeResponses} from '../../../responses/question-type/question-type.responses';
import {QuestionResponses} from '../../../responses/question/question.responses';
import {ResultTypeResponses} from '../../../responses/result_type_id/result_type.responses';
import {ClassroomService} from '../../../services/classroom/classroom.service';
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
  createTestDTO!: TestDTO;
  classRoomId: string | null = '';
  questionIDs: string[] = [];
  questions: QuestionResponses[] = [];
  questionTypes!: QuestionTypeResponses[];
  questionSub!: Subscription;
  maxDate!: Date;
  minDate!: Date;
  classroom!: ClassroomResponses;
  closeResult: string = '';
  @ViewChild('fileUpload', {static: true}) fileUpload !: ElementRef;
  protected readonly environment = environment;

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService,
              private modalService: NgbModal, private testService: TestService, private imageService: UploadImageService, private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService, private classroomService: ClassroomService) {
  }

  ngOnInit() {
    // this.resultTypes = this.sharedService.resultType;
    this.classRoomId = this.route.snapshot.paramMap.get('classId');

    if (this.classRoomId) {
      this.getClassroom();
    }

    this.getAllTestByUser();
    this.resultTypes = JSON.parse(<string>sessionStorage.getItem('resultTypes'));
    // this.questionTypes = this.sharedService.questionTypeResponses;
    this.questionTypes = JSON.parse(<string>sessionStorage.getItem('questionTypes'));
    this.setQuestions();
    this.initForm();
    const now = new Date();
    this.minDate = new Date();
    this.minDate.setDate(now.getDate() - 1);
    this.maxDate = new Date();
    this.maxDate.setDate(now.getDate() + 365);
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
        title: 'Bài kiểm tra phải có ít nhất 1 câu hỏi!',
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
          const token = localStorage.getItem('token');
          let imgFile = this.fileUpload.nativeElement.files[0];
          this.setQuestionIds();
          // console.log(this.questionIDs);
          this.createTestDTO = {
            name: this.createTestForm.get('name')?.value,
            description: this.createTestForm.get('description')?.value,
            question_ids: this.questionIDs,
            time_question: this.createTestForm.get('time_question')?.value===0 ? null: this.createTestForm.get('time_question')?.value,
            time_total: this.createTestForm.get('time_total')?.value===0 ? null: this.createTestForm.get('time_total')?.value,
            view_result_type_code: this.createTestForm.get('view_result_type_code')?.value,
            image_id: '',
            total_question: this.questionIDs.length,
            close_time: this.createTestForm.get('isHasCloseTime')?.value ? this.createTestForm.get('close_time')?.value: null,
            open_time: this.createTestForm.get('isHasOpenTime')?.value ? this.createTestForm.get('open_time')?.value: null,
            max_point: this.classRoomId ? this.createTestForm.get('max_point')?.value: null,
            classRoomId: this.classRoomId,
          };
          // console.log(this.createTest);

          this.removeSeconds();
          this.changeTime();
          if (this.createTestDTO.close_time && this.createTestDTO.open_time && this.createTestDTO.open_time.getTime() >= this.createTestDTO.close_time.getTime()) {
            Swal.fire({
              icon: 'error',
              title: 'Thời gian mở bài kiểm tra không được muộn hơn thời gian đóng bài kiểm tra!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
            return;
          }
          if (this.numberOfTest > 10 && this.role==='user') {
            Swal.fire({
              icon: 'error',
              title: 'Số lượng bài kiểm tra tối đa là 10! Vui lòng nâng cấp tài khoản để tạo thêm bài kiểm tra!',
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
            this.imageService.uploadImage(imgFile, token).subscribe(result => {
              this.createTestDTO.image_id = result.public_id;
              this.createTest();
              // console.log(result);
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

  private createTest() {
    this.testService.createTest(this.createTestDTO).subscribe(
      (response: any) => {
        // console.log(response);
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Tạo bài kiểm tra mới thành công!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(
          res => {
            if (this.classRoomId) {
              this.classroomService.getOneClassroom(this.classRoomId).subscribe(
                res => {
                  this.sharedService.classroomChanged.next(res);
                },
              );
              this.router.navigate(['../../'], {relativeTo: this.route});
            } else {
              this.router.navigate(['test', response.data.id]);
            }
          },
        );
      }, error => {
        // console.log(error);
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

  private initForm() {
    if (this.classRoomId) {
      this.createTestForm = new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'time_total': new FormControl(0),
        'time_question': new FormControl(0),
        'view_result_type_code': new FormControl(this.resultTypes[0].code, [Validators.required]),
        'test_type': new FormControl('fullTime', [Validators.required]),
        'isHasOpenTime': new FormControl(false),
        'isHasCloseTime': new FormControl(false),
        'max_point': new FormControl(1, [Validators.required, Validators.max(this.classroom.standardPoint), Validators.min(1)]),
        'open_time': new FormControl(new Date(new Date().setSeconds(0)), [Validators.required]),
        'close_time': new FormControl(new Date(new Date(new Date().getTime() + 120 * 60 * 1000).setSeconds(0)), [Validators.required]),
      });
    } else {
      this.createTestForm = new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'description': new FormControl('', [Validators.required]),
        'time_total': new FormControl(0),
        'time_question': new FormControl(0),
        'view_result_type_code': new FormControl(this.resultTypes[0].code, [Validators.required]),
        'test_type': new FormControl('fullTime', [Validators.required]),
        'isHasOpenTime': new FormControl(false),
        'isHasCloseTime': new FormControl(false),
        'open_time': new FormControl(new Date(new Date().setSeconds(0)), [Validators.required]),
        'close_time': new FormControl(new Date(new Date(new Date().getTime() + 120 * 60 * 1000).setSeconds(0)), [Validators.required]),
      });
    }
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

  private removeSeconds() {

    if (this.createTestDTO.open_time) {
      this.createTestDTO.open_time = new Date(new Date(this.createTestDTO.open_time).setSeconds(0));
    }
    if (this.createTestDTO.close_time) {
      this.createTestDTO.close_time = new Date(new Date(this.createTestDTO.close_time).setSeconds(0));
    }

  }

  private changeTime() {
    if (this.createTestDTO.open_time) {
      this.createTestDTO.open_time = new Date(this.createTestDTO.open_time.getTime() + 7 * 60 * 60 * 1000);
    }
    if (this.createTestDTO.close_time) {
      this.createTestDTO.close_time = new Date(this.createTestDTO.close_time.getTime() + 7 * 60 * 60 * 1000);
    }
  }

  private getClassroom() {
    this.classroom = this.sharedService.classroom;
    this.sharedService.classroomChanged.subscribe(
      res => {
        this.sharedService.classroom = res;
        this.classroom = this.sharedService.classroom;
      },
    );
  }
}
