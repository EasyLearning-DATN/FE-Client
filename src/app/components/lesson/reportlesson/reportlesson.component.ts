import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../commons/confirm-modal/confirm-modal.component';
import { ReportDTO } from 'src/app/DTOS/report/report.dto';
import { ReportService } from 'src/app/services/report/report.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportlesson',
  templateUrl: './reportlesson.component.html',
  styleUrls: ['./reportlesson.component.css']
})
export class ReportlessonComponent {
  // @ViewChild('reportForm', { static: false }) reportForm! : NgForm;
  targetId: string = '';
  reason: string = '';
  type: string = '';

  reportLesson = new FormGroup({
    reason: new FormControl("")
  });


  private closeResult = '';

  constructor(private modalService: NgbModal,
    private config: NgbModalConfig,
    private reportService: ReportService,
    private router: Router
  ) {
    const urlParts = window.location.pathname.split('/');
    this.targetId = urlParts[urlParts.length - 1];
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnChanges(): void {

  }

  sendReport() {
    const reportDTO = new ReportDTO();
    reportDTO.targetId = this.targetId;
    reportDTO.reason = this.reportLesson.get("reason")?.value || "";
    reportDTO.type = "LESSON";
    this.reportService.sendReport(reportDTO).subscribe(
      response => {
        console.log(response);
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
