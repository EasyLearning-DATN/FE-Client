import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs';
import {environment} from 'src/environments/environments';
import {SharedService} from '../shared/shared.service';
import {TestListResponses, TestResponses} from 'src/app/responses/test/test.responses';
import {TestDTO} from "../../DTOS/test/test.dto";

@Injectable({
  providedIn: 'root',
})
export class TestService {

  private apigetAllTest = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_TEST;
  private apiCreateTest = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST;
  private apiGetTest = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_TEST;
  private apiUpdateTest = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST;
  private apiDeleteTest = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router) {
  }

  // get all test và gán vào test responses
  getAllTest() {
    return this.http.get<any>(this.apigetAllTest)
    .pipe(
      map((response) => {
        let tests: TestListResponses = response.data;
        tests.data = tests.data.map(test => {
          return {...test, questions: test.question_tests ? test.question_tests : []};
        });
        return tests;
      }),
      tap((tests: TestListResponses) => {
        this.sharedService.allTest = tests.data;
      }));
  }

  getHomeTest() {
    return this.http.get<any>(this.apigetAllTest, {
      params: {limit: 8},
    })
    .pipe(
      map((response) => {
        let tests: TestListResponses = response.data;
        tests.data = tests.data.map(test => {
          return {...test, questions: test.question_tests ? test.question_tests : []};
        });
        return tests;
      }),
      tap((tests: TestListResponses) => {
        this.sharedService.testsHome = tests.data;
      }));
  }

  getOneTest(id: string) {
    return this.http.get(this.apiGetTest + '/' + id).pipe(
      map((response: any) => {
        return response.data;
      }), tap((response: TestResponses) => {
        this.sharedService.test = response;
      }),
    );
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
          return {...test, questions: test.question_tests ? test.question_tests : []};
        });
        return tests;
      }),
      tap((tests: TestListResponses) => {
        this.sharedService.allTest = tests.data;
      }));
  }

  createTest(test: TestDTO) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(this.apiCreateTest, test, {
      headers: headers,
    });
  }

  updateTest(id: string, test: TestDTO) {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.put(this.apiUpdateTest + '/' + id, test, {
      headers,
    });
  }

  deleteTest(id: string) {
    const token = localStorage.getItem('token');
    return this.http.delete(this.apiDeleteTest + '/' + id, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  checkTestOfUser(userId: string, id: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('createdBy', userId);
    searchParams = searchParams.append('id', id);
    return this.http.get<any>(this.apigetAllTest, {
      params: searchParams,
    }).pipe(
      map((response) => {
        let tests: TestListResponses = response.data;
        tests.data = tests.data.map(test => {
          return {...test};
        });
        return tests.data;
      }));
  }

}
