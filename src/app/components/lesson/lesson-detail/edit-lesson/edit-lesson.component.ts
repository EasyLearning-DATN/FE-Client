import {Component, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmModalComponent} from "../../../commons/confirm-modal/confirm-modal.component";
import {SharedService} from "../../../../services/shared/shared.service";
import {LessonService} from "../../../../services/lesson/lesson.service";
import {LessonResponses} from "../../../../responses/lesson/lesson.responses";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css'],
})
export class EditLessonComponent implements OnChanges, OnInit {

  updateLessonForm = new FormGroup({
    name: new FormControl(this.sharedService.lesson.name, [Validators.required]),
    description: new FormControl(this.sharedService.lesson.description, [Validators.required]),

  });
  lesson !: LessonResponses;
  image!: File;
  private closeResult = '';

  constructor(private modalService: NgbModal, private config: NgbModalConfig, private sharedService: SharedService,
    private lessonService: LessonService, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.lesson = this.sharedService.lesson;
  }

  ngOnChanges(): void {
    // this.updateLessonForm.setValue({
    //     title: this.lesson.title,
    //     description: this.lesson.description
    // });
  }


  onUpdate() {
    // this.lesson.title = this.updateLessonForm.get("title")?.value || "";
    // this.lesson.description = this.updateLessonForm.get("description")?.value || "";
    // const formData = new FormData();
    // console.log("file", this.file)
    // if(this.file != null){
    //     const publicIdImage = this.lesson.image.publicId.split('/', 2);
    //     formData.append("image", this.file)
    //     formData.append("folder", publicIdImage[0])
    //     formData.append("fileName", publicIdImage[1])
    //     this.imageServie.upadteImage(formData);
    //     console.log("update Imgage Success")
    // }
    // console.log("lesson", this.lesson)
    // this.lessonService.update(this.lesson);
    // setTimeout(() =>{
    //     this.updateEvent.emit()
    // }, 5000)
    // window.alert("Cập nhật bài học thành công")
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

  openConfirmSave(file: any) {
    const modalConfirm = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    modalConfirm.componentInstance.body = "Bạn có chắc chắn muốn lưu không?";
    modalConfirm
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
          this.image = file;
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
