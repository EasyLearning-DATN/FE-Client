import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {TRANSLATE} from '../../../../environments/environments';
import {ClassroomDTO} from '../../../DTOS/classroom/classroom.dto';
import {ClassroomService} from '../../../services/classroom/classroom.service';
import {SharedService} from '../../../services/shared/shared.service';
import {UploadImageService} from '../../../services/shared/upload/upload-image.service';
import {ConfirmModalComponent} from '../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css'],
})
export class CreateClassComponent implements OnInit {
  urlImage: any;
  createClassForm!: FormGroup;
  createClassDTO!: ClassroomDTO;
  closeResult: string = '';
  @ViewChild('fileUpload', {static: true}) fileUpload !: ElementRef;

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService,
              private modalService: NgbModal, private classroomService: ClassroomService,
              private imageService: UploadImageService, private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.initForm();
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

  onCreateClass() {
    let title = '';
    if (!this.createClassForm.valid) {
      this.translate.stream(TRANSLATE.MESSAGE.ERROR.CREATE_CLASSROOM_001).subscribe(
        res => {
          title = res;
        },
      );
      Swal.fire({
        icon: 'warning',
        title: title,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }
    const confirmModal = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    let body = '';
    this.translate.stream(TRANSLATE.MESSAGE.CONFIRM_MODAL.CREATE_CLASSROOM_CREATE).subscribe(
      res => {
        body = res;
      },
    );
    confirmModal.componentInstance.body = {value: body};
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
          // console.log(this.questionIDs);
          this.createClassDTO = {
            name: this.createClassForm.get('name')?.value,
            description: this.createClassForm.get('description')?.value,
            isPublic: this.createClassForm.get('isPublic')?.value,
            image_id: '',
          };
          // console.log(this.createTest);
          this.imageService.uploadImage(imgFile, token).subscribe(result => {
            this.createClassDTO.image_id = result.public_id;
            this.classroomService.createClassroom(this.createClassDTO).subscribe(
              (response: any) => {
                // console.log(response);
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Tạo lớp học mới thành công!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
                this.router.navigate(['teaching/classroom', response.data.id]);
              }, error => {
                // console.log(error);
                Swal.close();
                Swal.fire({
                  icon: 'error',
                  title: 'Tạo lớp học mới thất bại!',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                });
              },
            );
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
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  private initForm() {
    this.createClassForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'isPublic': new FormControl('true', [Validators.required]),
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
