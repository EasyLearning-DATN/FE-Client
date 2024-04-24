import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {TRANSLATE} from '../../../../environments/environments';
import {ClassroomDTO} from '../../../DTOS/classroom/classroom.dto';
import {ClassroomResponses} from '../../../responses/classroom/classroom.responses';
import {ClassroomService} from '../../../services/classroom/classroom.service';
import {SharedService} from '../../../services/shared/shared.service';
import {UploadImageService} from '../../../services/shared/upload/upload-image.service';
import {ConfirmModalComponent} from '../../commons/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css'],
})
export class ClassEditComponent implements OnInit {
  urlImage: any;
  classroom!: ClassroomResponses;
  updateClassForm!: FormGroup;
  updateClassDTO!: ClassroomDTO;
  closeResult: string = '';
  @ViewChild('fileUpload', {static: true}) fileUpload !: ElementRef;

  constructor(private offcanvasService: NgbOffcanvas, private sharedService: SharedService,
              private modalService: NgbModal, private classroomService: ClassroomService,
              private imageService: UploadImageService, private router: Router,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.getClassroom();
    this.initForm();
  }

  uploadImage(event: any) {
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e) => {
        this.urlImage = reader.result;
      };
    } else {
      this.urlImage = null;
    }
  }

  onUpdateClass() {
    let title = '';
    if (!this.updateClassForm.valid) {
      this.translate.stream(TRANSLATE.MESSAGE.ERROR.EDIT_CLASSROOM_001).subscribe(
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
    this.translate.stream(TRANSLATE.MESSAGE.CONFIRM_MODAL.EDIT_CLASSROOM_EDIT).subscribe(
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
          this.translate.stream(TRANSLATE.MESSAGE.PROGRESS.EDIT_CLASSROOM_001).subscribe(
            res => {
              title = res;
            },
          );
          Swal.fire({
            title: title,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          let imgFile = this.fileUpload.nativeElement.files[0];

          this.updateClassDTO = {
            name: this.updateClassForm.get('name')?.value,
            description: this.updateClassForm.get('description')?.value,
            isPublic: this.updateClassForm.get('isPublic')?.value,
            standardPoint: this.updateClassForm.get('standardPoint')?.value,
            imageId: '',
          };

          // console.log(this.createTest);

          if (this.urlImage===null) {
            this.updateClassDTO.imageId = this.classroom.image.public_id;
            this.updateClass();
          } else {
            this.imageService.uploadImage(imgFile, token).subscribe(result => {
              this.updateClassDTO.imageId = result.public_id;
              // console.log(result.public_id);
              this.updateClass();
              // console.log(result);
            }, error => {
              Swal.close();
              this.translate.stream(TRANSLATE.MESSAGE.ERROR.EDIT_CLASSROOM_002).subscribe(
                res => {
                  title = res;
                },
              );
              Swal.fire({
                icon: 'error',
                title: title,
                text: error.error.message,
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

  private updateClass() {
    let title = '';
    this.classroomService.createClassroom(this.updateClassDTO).subscribe(
      (response: any) => {
        // console.log(response);
        console.log(this.updateClassDTO.imageId);
        Swal.close();
        this.translate.stream(TRANSLATE.MESSAGE.SUCCESS.EDIT_CLASSROOM_001).subscribe(
          res => {
            title = res;
          },
        );
        Swal.fire({
          icon: 'success',
          title: title,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/classroom', response.data.id]);
      }, error => {
        // console.log(error);
        Swal.close();
        this.translate.stream(TRANSLATE.MESSAGE.ERROR.EDIT_CLASSROOM_003).subscribe(
          res => {
            title = res;
          },
        );
        Swal.fire({
          icon: 'error',
          title: title,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      },
    );
  }

  private getClassroom() {
    this.classroom = this.sharedService.classroom;
    this.sharedService.classroomChanged.subscribe(
      res => {
        this.classroom = res;
      },
    );
  }

  private initForm() {
    this.updateClassForm = new FormGroup({
      'name': new FormControl(this.classroom.name, [Validators.required]),
      'description': new FormControl(this.classroom.description, [Validators.required]),
      'isPublic': new FormControl(this.classroom.is_public, [Validators.required]),
      'standardPoint': new FormControl(10, [Validators.required, Validators.min(10), Validators.max(200)]),
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
