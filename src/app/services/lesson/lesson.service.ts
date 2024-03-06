import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs";
import {SharedService} from "../shared/shared.service";
import {LessonsResponses} from "../../responses/lessons/lessons.responses";
import {LessonDTO} from 'src/app/DTOS/lesson/lesson.dto';
import {LessonResponses} from "src/app/responses/lesson/lesson.responses";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  private apiGetListLesson = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON;
  private apiGetOneLesson = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON;
  private apiCreateLesson = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_LESSON;
  private apiUpdateLesson = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_LESSON + environment.ID;
  private apiDeleteLesson = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_LESSON + environment.ID;
  private apiGetListLessonByUser = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_LESSON;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) {
  }

  getListLessonHome() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('sort', 'des');
    searchParams = searchParams.append('page', 0);
    searchParams = searchParams.append('limit', 8);
    return this.http.get<any>(this.apiGetListLesson, {
      params: searchParams,
    })
    .pipe(
      map((response) => {
        let lessons: LessonsResponses = response.data;
        lessons.data = lessons.data.map(lesson => {
          return {...lesson, questions: lesson.questions ? lesson.questions : []};
        });
        return lessons;
      }),
      tap((lessons: LessonsResponses) => {
        this.sharedService.lessonsHome = lessons.data;
        // console.log(lessons.data);
        // console.log(this.sharedService.lessonsHome);
      }));
  }

  getListLessonByUser(userId: string) {
    let searchParams = new HttpParams().set('createdBy', userId);
    return this.http.get<any>(this.apiGetListLessonByUser, {
      params: searchParams,
    })
    .pipe(
      map((response) => {
        let lessons: LessonsResponses = response.data;
        lessons.data = lessons.data.map(lesson => {
          return {...lesson, questions: lesson.questions ? lesson.questions : []};
        });
        return lessons;
      }),
      tap((lessons: LessonsResponses) => {
        this.sharedService.lessonsHome = lessons.data;
      }));
  }

  // create lesson
  createLesson(lessonDTO: LessonDTO) {
    const token = localStorage.getItem('token');
    console.log(lessonDTO);
    console.log(token);
    return this.http.post<any>(this.apiCreateLesson, lessonDTO, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    .pipe(
      map((response) => {
        return response;
      }),
      tap((response) => {
        console.log(response);
      }));
  }

  getOneLesson(id: number) {
    return this.http.get<any>(this.apiGetOneLesson + '/' + id).pipe(
      map((response) => {
        let lesson: LessonResponses = response.data;
        return {...lesson, questions: lesson.questions ? lesson.questions : []};

      }),
      tap((lesson: LessonResponses) => {
          this.sharedService.lesson = lesson;
          // console.log(lesson);
        }, error => {
          console.log(error.message);
          this.router.navigate(['404']);
        },
      ));
  }

  deleteLesson(id: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(this.apiDeleteLesson + '/' + id, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  checkLessonOfUser(userId: string, id: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('createdBy', userId);
    searchParams = searchParams.append('id', id);
    return this.http.get<any>(this.apiGetListLesson, {
      params: searchParams,
    }).pipe(
      map((response) => {
        let lessons: LessonsResponses = response.data;
        lessons.data = lessons.data.map(lesson => {
          return {...lesson, questions: lesson.questions ? lesson.questions : []};
        });
        return lessons;
      }));
  }

  getAllLessons(page: number = 0) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('sort', 'des');
    searchParams = searchParams.append('page', page);
    searchParams = searchParams.append('limit', 12);
    return this.http.get<any>(this.apiGetListLesson, {
      params: searchParams,
    })
    .pipe(
      map((response) => {
        let lessons: LessonsResponses = response.data;
        lessons.data = lessons.data.map(lesson => {
          return {...lesson, questions: lesson.questions ? lesson.questions : []};
        });
        return lessons;
      }),
      tap((lessons: LessonsResponses) => {
        this.sharedService.allLessons = lessons.data;
        console.log(lessons.data);
        console.log(this.sharedService.allLessons);
      }));
  }
}
