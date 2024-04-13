import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environments';
import {ClassroomDTO} from '../../DTOS/classroom/classroom.dto';
import {SharedService} from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {

  private apiCreateClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiGetAllClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiGetOneClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM;
  private apiInviteStudent = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM + environment.API_INVITE_STUDENT;
  private apiJoinClassroom = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_CLASSROOM + environment.API_JOIN_CLASSROOM;
  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  createClassroom(classroomDTO: ClassroomDTO) {
    return this.http.post(this.apiCreateClassroom, classroomDTO);
  }

  getAllClassroom() {
    return this.http.get(this.apiGetAllClassroom);
  }

  getOneClassroom(id: string) {
    return this.http.get(this.apiGetOneClassroom + '/' + id);
  }

  inviteStudentToClassroom( classRoomId: string, emails: string[]) {
    const body = {
      classRoomId,
      emails
    };
    return this.http.put(this.apiInviteStudent, body);
  }

  joinClassroom(token: string) {
    return this.http.get(this.apiJoinClassroom + '?token=' + token);
  }

}
