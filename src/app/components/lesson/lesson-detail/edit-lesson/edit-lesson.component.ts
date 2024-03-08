import {Component, OnInit, TemplateRef} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmModalComponent} from "../../../commons/confirm-modal/confirm-modal.component";
import {SharedService} from "../../../../services/shared/shared.service";
import {LessonService} from "../../../../services/lesson/lesson.service";
import {LessonResponses} from "../../../../responses/lesson/lesson.responses";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {UploadImageService} from "../../../../services/shared/upload/upload-image.service";
import {LessonDTO} from "../../../../DTOS/lesson/lesson.dto";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css'],
})
export class EditLessonComponent implements OnInit {

  updateLessonForm = new FormGroup({
    name: new FormControl(this.sharedService.lesson.name, [Validators.required]),
    description: new FormControl(this.sharedService.lesson.description, [Validators.required]),
  });
  lesson !: LessonResponses;
  image: string = '';
  private closeResult = '';

  constructor(private modalService: NgbModal, private config: NgbModalConfig, private sharedService: SharedService,
    private lessonService: LessonService, private router: Router, private imageService: UploadImageService, private route: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.lesson = this.sharedService.lesson;
  }


  onUpdate() {
    if (!this.updateLessonForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Không thể sửa!',
        text: 'Vui lòng điền đầy đủ thông tin bài học!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
      return;
    }
    console.log(this.image);
    if (this.image !== '') {
      const token = localStorage.getItem("token");
      this.imageService.uploadImage(this.image, token).subscribe(
        (response) => {
          const image_id = response.public_id;
          console.log(response.public_id);
          this.updateLesson(image_id);
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Không thể cập nhật hình ảnh!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          console.log(error);
        },
      );
    } else {
      this.updateLesson(this.lesson.image.public_id);
    }

  }

  updateLesson(imageId: string) {
    const lessondto: LessonDTO = {
      name: <string>this.updateLessonForm.get('name')?.value,
      description: <string>this.updateLessonForm.get('description')?.value,
      image_id: imageId,
    };
    this.lessonService.updateLesson(this.lesson.id, lessondto)
    .subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Sửa bài học thành công!',
          text: 'Bạn đã cập nhật bài học thành công!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        this.lessonService.getOneLesson(this.route.snapshot.params['id']).subscribe(
          response => {
            this.sharedService.lessonChanged.next(response);
          }, error => {
            console.log(error);
          });
        this.modalService.dismissAll('Update success!');
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Sửa bài học thất bại!',
          text: 'Không thể sửa bài học này!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      },
    );
  }

  openConfirmDelete() {
    const modalConfirm = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    modalConfirm.componentInstance.body = "Bạn có chắc chắn muốn xóa bài học này không?";
    modalConfirm
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
          this.imageService.deleteImage(this.lesson.image.public_id).subscribe(
            (response) => {
              console.log(response);
            }, error => {
              console.log(error);
            },
          );
          this.lessonService.deleteLesson(this.sharedService.lesson.id).subscribe(
            (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Xóa bài học thành công!',
                text: 'Bạn đã xóa bài học này, bạn sẽ được đưa về trang danh sách bài học!',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              });
              this.modalService.dismissAll('Delete lesson success!');
              this.router.navigate(['/']);
            }, error => {
              Swal.fire({
                icon: 'error',
                title: 'Xóa bài học thất bại!',
                text: 'Bài học không thể xóa!',
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

  openEdit(content: TemplateRef<any>) {
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

  openConfirmSave() {
    const modalConfirm = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    modalConfirm.componentInstance.body = "Bạn có chắc chắn muốn lưu thay đổi không?";
    modalConfirm
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
          this.onUpdate();
          console.log(result);
        }

      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log(this.closeResult);
      },
    );
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
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
