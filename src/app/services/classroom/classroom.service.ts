import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs';
import Swal from 'sweetalert2';
import {environment} from '../../../environments/environments';
import {ClassroomDTO} from '../../DTOS/classroom/classroom.dto';
import {ClassroomResponses} from '../../responses/classroom/classroom.responses';
import {SharedService} from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {

  private apiCreateClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiUpdateClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiDeleteClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiGetAllClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiGetOneClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiInviteStudent = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM + environment.API_INVITE_STUDENT;
  private apiJoinClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM + environment.API_JOIN_CLASSROOM;
  private apiGetClasses = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiUpdatePointMember = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_ROOM_MEMBER;
  private apiCheckIsInClassRoom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiCheckIsHaveEduRole = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM + '/is-teacher';
  private apiCheckIsRoomOwner = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) {
  }

  checkIsInClassRoom(classId: string) {
    return this.http.get(this.apiCheckIsInClassRoom + '/' + classId + '/is-on-classroom').pipe(
      map((response: any) => {
        console.log('Hello');
        if (!<boolean>response.data) {
          this.router.navigate(['/classroom/list-classroom']);
          Swal.fire({
            icon: 'warning',
            title: 'Không đủ quyền!',
            text: 'Bạn không thuộc lớp học này!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
        return <boolean>response.data;
      }),
    );
  };

  checkIsHaveEduRole() {
    return this.http.get(this.apiCheckIsHaveEduRole).pipe(
      map((response: any) => {
          // console.log(response.data);
          if (!<boolean>response.data) {
            this.router.navigate(['/upgrade']);
            Swal.fire({
              icon: 'warning',
              title: 'Không đủ quyền!',
              text: 'Vui lòng nâng cấp tài khoản lên EDU!',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            });
          }
          return <boolean>response.data;
        },
      ),
    );
  };

  checkIsRoomOwner(classId: string) {
    return this.http.get(this.apiCheckIsRoomOwner + '/' + classId + '/is-room-owner').pipe(
      map((response: any) => {

        if (!<boolean>response.data) {
          this.router.navigate(['/classroom/list-classroom']);
          Swal.fire({
            icon: 'warning',
            title: 'Không đủ quyền!',
            text: 'Bạn không phải giảng viên của lớp này!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        }
        return <boolean>response.data;
      }),
    );
  };

  createClassroom(classroomDTO: ClassroomDTO) {
    return this.http.post(this.apiCreateClassroom, classroomDTO);
  }

  getAllClassroom(key: string, page: number) {
    return this.http.get(this.apiGetAllClassroom, {
      params: {
        key: key,
        sort: 'des',
        page: page,
        limit: 9,
        sortBy: 'createdDate',
      },
    });
  }

  getClasses(key: string, page: number, username: string) {
    return this.http.get(this.apiGetClasses, {
      params: {
        key: key,
        sort: 'des',
        page: page,
        limit: 9,
        sortBy: 'createdDate',
        username: username,
      },
    });
  }

  getOneClassroom(id: string) {
    return this.http.get(this.apiGetOneClassroom + '/' + id).pipe(
      map(
        (res: any) => {
          return <ClassroomResponses>res.data;
        }),
      tap(
        (classroom: ClassroomResponses) => {
          this.sharedService.classroom = classroom;
        }, error => {
          console.log(error.message);
          this.router.navigate(['404']);
        },
      ),
    );
  }

  updateClassroom(id: string, classroom: ClassroomDTO) {
    return this.http.put(this.apiUpdateClassroom + '/' + id, classroom).pipe(
      map(
        (response: any) => {
          return <ClassroomResponses>response.data;
        },
      ),
    );
  }

  deleteClassroom(id: string) {
    return this.http.delete(this.apiDeleteClassroom + '/' + id);
  }

  inviteStudentToClassroom(classRoomId: string, emails: string[]) {
    const body = {
      classRoomId,
      emails,
    };
    return this.http.put(this.apiInviteStudent, body);
  }

  joinClassroom(token: string) {
    return this.http.get(this.apiJoinClassroom + '?token=' + token);
  }

  updatePointMember(id: string, point: number) {
    const body = {
      id,
      point,
    };
    return this.http.put(this.apiUpdatePointMember + '/update', body);
  }

  deleteMember(id: any) {
    return this.http.delete(this.apiUpdatePointMember + '/' + id);
  }

}
