import {Component, OnChanges, TemplateRef} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {ConfirmModalComponent} from "../../../commons/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css'],
})
export class EditLessonComponent implements OnChanges {

  updateLessonForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
  });
  private closeResult = '';
  private file!: File;

  constructor(private modalService: NgbModal, private config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
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

  onDelete() {

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

  openConfirm(file: any) {
    const modalConfirm = this.modalService.open(ConfirmModalComponent);
    // modalConfirm.componentInstance.title ="";
    // modalConfirm.componentInstance.body = "";
    modalConfirm
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.closeResult);
        if (result === 'Confirm') {
          this.file = file;
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
