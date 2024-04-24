import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClassroomService} from 'src/app/services/classroom/classroom.service';
import Swal from 'sweetalert2';
import {ClassroomResponses} from '../../../responses/classroom/classroom.responses';
import {SharedService} from '../../../services/shared/shared.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css'],
})
export class ClassDetailComponent implements OnInit {
  classroom!: ClassroomResponses;
  studentEmail: string = '';
  @ViewChild('modal') modal: any;

  constructor(
    private classroomService: ClassroomService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.getClassroom();
  }

  getClassroom() {
    const id = this.route.snapshot.paramMap.get('classId') as string;
    this.classroom = this.sharedService.classroom;
    this.sharedService.classroomChanged.subscribe(
      res => {
        this.classroom = res;
      },
    );
    // this.classroomService.getOneClassroom(id).subscribe((data: any) => {
    //   this.classroom = data;
    //   console.log(this.classroom.lessons);
    // });
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
      },
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

  onDeleteLesson(lessonId: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa bài học này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.lessonService.deleteLesson(lessonId).subscribe((data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: data.data,
          });
          this.getClassroom();
        });
      }
    });
  }

}
