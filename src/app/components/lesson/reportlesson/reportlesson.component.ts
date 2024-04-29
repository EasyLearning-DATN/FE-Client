import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../commons/confirm-modal/confirm-modal.component';
import { ReportDTO } from 'src/app/DTOS/report/report.dto';
import { ReportService } from 'src/app/services/report/report.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UploadImageService } from 'src/app/services/shared/upload/upload-image.service';
import { ImageResponses } from 'src/app/responses/image/image.responses';

@Component({
  selector: 'app-reportlesson',
  templateUrl: './reportlesson.component.html',
  styleUrls: ['./reportlesson.component.css']
})
export class ReportlessonComponent {
  // @ViewChild('reportForm', { static: false }) reportForm! : NgForm;
  targetId: string = '';
  reason: string = '';
  image: string = '';
  type: string = '';

  reportLesson = new FormGroup({
    reason: new FormControl(""),
    image: new FormControl("")
  });


  private closeResult = '';

  constructor(private modalService: NgbModal,
    private config: NgbModalConfig,
    private reportService: ReportService,
    private imgUpload : UploadImageService,
    private router: Router
  ) {
    const urlParts = window.location.pathname.split('/');
    this.targetId = urlParts[urlParts.length - 1];
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnChanges(): void {

  }

  // xử lý upload ảnh
  // onSendReport() {
  //   this.imgUpload.uploadImage(this.image, localStorage.getItem('token')).subscribe(
  //     (res : ImageResponses) => {
  //       this.image = res.public_id;
  //       console.log(res.public_id);
  //       this.sendReport();
  //   }, error => {
  //     console.log(error);
  //   });
  //   }

  sendReport() {
    if (this.image) {
      const reportDTO = new ReportDTO();
      reportDTO.targetId = this.targetId;
      reportDTO.reason = this.reportLesson.get("reason")?.value || "";
      reportDTO.type = "LESSON";
      reportDTO.image = this.image;
      console.log(this.image);
      this.reportService.sendReport(reportDTO, this.image).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Gửi báo cáo thành công',
            showConfirmButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Gửi báo cáo thất bại',
            showConfirmButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            timer: 1500
          });
          console.log(error);
        }
      );
    } else {
      // Nếu ảnh chưa được upload, hiển thị thông báo hoặc xử lý phù hợp ở đây
      console.log("Vui lòng chờ cho đến khi ảnh được upload.");
    }
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  openEdit(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg', scrollable: true })
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
