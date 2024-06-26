import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ClassroomService} from 'src/app/services/classroom/classroom.service';
import {LessonService} from 'src/app/services/lesson/lesson.service';
import Swal from 'sweetalert2';
import {ClassroomResponses} from '../../../responses/classroom/classroom.responses';
import {UserResponse} from '../../../responses/user/user.responses';
import {SharedService} from '../../../services/shared/shared.service';
import {TestService} from '../../../services/test/test.service';
import { ExcelService } from 'src/app/services/excel/excel.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css'],
})
export class ClassDetailComponent implements OnInit {
  classroom!: ClassroomResponses;
  classRoomId: null | string = null;
  updatedPoint: number = 0;
  studentEmail: string = '';
  isCreator: boolean = false;
  isJoin: boolean = false;
  @ViewChild('modal') modal: any;

  constructor(
    private classroomService: ClassroomService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private sharedService: SharedService,
    private testService: TestService,
    private excelService : ExcelService,
  ) {
  }

  ngOnInit(): void {
    this.classRoomId = this.route.snapshot.paramMap.get('classId') as string;
    console.log(this.classRoomId);
    this.getClassroom();
    this.checkAuth();
    console.log(this.classroom);
    const userInfoString = localStorage.getItem('userInfo') || '';
    if (userInfoString==='') {
      this.isCreator = false;
    } else {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '');
      const username = userInfo ? userInfo.username: '';
      if (username===this.classroom.creator.username) {
        this.isCreator = true;
      } else {
        this.isCreator = false;
      }
    }
    this.checkJoinClass();
  }

  checkJoinClass() {
    const idUser = JSON.parse(localStorage.getItem('userInfo') || '{}').username || '';
    let isJoin = false;

    // Kiểm tra xem idUser có trong danh sách students không
    this.classroom.students.forEach(student => {
        if (student.user.user_info.username === idUser) {
            isJoin = true;
        }
    });

    this.isJoin = isJoin;
    console.log(this.isJoin);
    console.log(idUser);
}


  getClassroom() {
    // const id = this.route.snapshot.paramMap.get('classId') as string;
    this.classroom = this.sharedService.classroom;
    this.sharedService.classroomChanged.subscribe(
      res => {
        this.sharedService.classroom = res;
        this.classroom = this.sharedService.classroom;
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
        this.modalService.dismissAll();
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

  onNavigateUpdateClassroom() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onNavigateCreateLesson() {
    this.router.navigate(['lesson/create-lesson'], {relativeTo: this.route});
  }

  onNavigateCreateTest() {
    this.router.navigate(['test/create-test'], {relativeTo: this.route});
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
          this.classroomService.getOneClassroom(this.classroom.id).subscribe(
            res => {
              this.sharedService.classroomChanged.next(res);
            },
          );
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: data.data,
          });
        });
      }
    });
  }

  onDeleteTest(testId: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa bài kiểm tra này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.testService.deleteTest(testId).subscribe((data: any) => {
          this.classroomService.getOneClassroom(this.classroom.id).subscribe(
            res => {
              this.sharedService.classroomChanged.next(res);
            },
          );
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: data.data,
          });
        });
      }
    });
  }

  updatePoint(id: any, point: number) {
    if (point < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Điểm không thể nhỏ hơn 0',
      });
      return;
    }
    // loading
    Swal.fire({
      title: 'Loading',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.hideLoading();
      },
    });
    this.classroomService.updatePointMember(id, point).subscribe((data: any) => {
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: data.data,
      });
    });
  }

  deleteMember(id: any) {
    // loading
    Swal.fire({
      title: 'Loading',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.hideLoading();
      },
    });
    this.classroomService.deleteMember(id).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: data.data,
      });
      this.getClassroom();
    });
  }

  private checkAuth() {
    // truyển userInfo từ localStorage và lấy id
    const userInfoString = localStorage.getItem('userInfo') || '';
    if (userInfoString==='') {
      this.isCreator = false;
    } else {
      const userInfo: UserResponse = JSON.parse(localStorage.getItem('userInfo') || '');
      const userId = userInfo ? userInfo.userInfoId: '';
      this.isCreator = userId===this.classroom.creator.id;
    }
  }

  exportExcel(): void {
    const dataToExport = [];
    const table = document.getElementById('listStudents');
    if (table) {
      const rows = table.getElementsByTagName('tr');
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const fullName = row.cells[1].textContent;
        const pointInput = row.cells[2].querySelector('input'); 
        const point = pointInput ? (pointInput as HTMLInputElement).value : '0';
        const rowData = {
          'Họ và Tên': fullName,
          'Điểm': point
        };
        dataToExport.push(rowData);
        console.log(fullName);
        console.log(parseInt(point || '0'));
      }
    }
    this.excelService.exportToExcel(dataToExport, 'Danh sách điểm lớp ' + this.classroom.name);
  }

}
