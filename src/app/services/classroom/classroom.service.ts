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

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  createClassroom(classroomDTO: ClassroomDTO) {
    return this.http.post(this.apiCreateClassroom, classroomDTO);
  }

}
