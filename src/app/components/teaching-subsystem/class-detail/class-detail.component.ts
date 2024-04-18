import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import {MatTabsModule} from '@angular/material/tabs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent {
  classroom: any;
  studentEmail: string = '';
  @ViewChild('modal') modal: any;

  constructor(
    private classroomService: ClassroomService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getClassroom();
  }

  getClassroom() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.classroomService.getOneClassroom(id).subscribe((data: any) => {
      this.classroom = data.data;
      console.log(this.classroom.lessons);
    });
  }

  // invite students to join the class
  inviteStudents() {
    const emailStudent: string[] = this.studentEmail.split('\n').map(email => email.trim());
    Swal.fire({
      title: 'Loading',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.hideLoading();
      }
    });
    console.log(this.classroom.id);
    this.classroomService.inviteStudentToClassroom(this.classroom.id, emailStudent).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: data.data,
      });
    });
  }

  openModal() {
    this.modalService.open(this.modal);
}

}
