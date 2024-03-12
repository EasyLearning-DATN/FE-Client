import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { LessonsResponses } from 'src/app/responses/lessons/lessons.responses';
import { environment } from 'src/environments/environments';
import { SharedService } from '../shared/shared.service';
import { TestListResponses } from 'src/app/responses/test/test.responses';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private apigetAllTest = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_TEST;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) { }

  // get all test và gán vào test responses
  getAllTest() {
    return this.http.get<any>(this.apigetAllTest)
      .pipe(
        map((response) => {
          let tests: TestListResponses = response.data;
          tests.data = tests.data.map(test => {
            return { ...test, questions: test.question_tests ? test.question_tests : [] };
          });
          return tests;
        }),
        tap((tests: TestListResponses) => {
          this.sharedService.allTest = tests.data;
        }));
  }

  searchTest(key: string) {
    let searchParams = new HttpParams().set('key', key);
    return this.http.get<any>(this.apigetAllTest, {
      params: searchParams,
    })
    .pipe(
      map((response) => {
        let tests: TestListResponses = response.data;
        tests.data = tests.data.map(test => {
          return { ...test, questions: test.question_tests ? test.question_tests : [] };
        });
        return tests;
      }),
      tap((tests: TestListResponses) => {
        this.sharedService.allTest = tests.data;
      }));
  }

}
