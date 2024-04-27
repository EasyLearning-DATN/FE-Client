import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {map, tap} from 'rxjs';
import {TestListResponses, TestResponses} from 'src/app/responses/test/test.responses';
import {environment} from 'src/environments/environments';
import {TestDTO} from '../../DTOS/test/test.dto';
import {SharedService} from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {

  private apigetAllTest = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_TEST;
  private apiCreateTest = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST;
  private apiGetTest = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_TEST;
  private apiUpdateTest = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST;
  private apiDeleteTest = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST;
  private apiGetListTestByUser = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_TEST;
  private apiCheckIsDoneTest = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_TEST;

  constructor(private http: HttpClient, private sharedService: SharedService, private router: Router, private cookieService: CookieService) {
  }

  // get all test và gán vào test responses
  getAllTest(page: number, size?: number) {
    return this.http.get<any>(this.apigetAllTest, {
      params: {
        limit: size ? size: 10,
        page: page,
        sort: 'des',
        sortBy: 'createdDate',
      },
    })
    .pipe(
      map((response) => {
        let tests: TestListResponses = response.data;
        tests.data = tests.data.map(test => {
          return {...test, questions: test.question_tests ? test.question_tests: []};
        });
        return tests;
      }),
      tap((tests: TestListResponses) => {
        this.sharedService.allTest = tests.data;
      }));
  }

  getHomeTest() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('sort', 'des');
    searchParams = searchParams.append('page', 0);
    searchParams = searchParams.append('limit', 8);
    searchParams = searchParams.append('sortBy', 'doingTime');
    searchParams = searchParams.append('classId', 'null');
    return this.http.get<any>(this.apigetAllTest, {
      params: searchParams,
    })
    .pipe(
      map((response) => {
        let tests: TestListResponses = response.data;
        tests.data = tests.data.map(test => {
          return {...test, questions: test.question_tests ? test.question_tests: []};
        });
        return tests;
      }),
      tap((tests: TestListResponses) => {
        this.sharedService.testsHome = tests.data;
      }));
  }

  getListTestByUsername(key: string, page: number, username: string) {
    return this.http.get<any>(this.apiGetListTestByUser, {
      params: {
        key: key,
        sort: 'des',
        page: page,
        limit: 9,
        sortBy: 'createdDate',
        username: username,
      },
    })
    .pipe(
      map((response) => {
        let tests: TestListResponses = response.data;
        tests.data = tests.data.map(test => {
          return {...test, questions: test.question_tests ? test.question_tests: []};
        });
        return tests;
      }),
      tap((tests: TestListResponses) => {
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
          return {...test, questions: test.question_tests ? test.question_tests: []};
        });
        return tests;
      }),
      tap((tests: TestListResponses) => {
        this.sharedService.allTest = tests.data;
      }));
  }

  createTest(test: TestDTO) {
    return this.http.post(this.apiCreateTest, test);
  }

  updateTest(id: string, test: TestDTO) {
    return this.http.put(this.apiUpdateTest + '/' + id, test);
  }

  deleteTest(id: string) {
    return this.http.delete(this.apiDeleteTest + '/' + id);
  }


  getTestByUser(userId: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('createdBy', userId);
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

  checkIsDoneTest(testId: string) {
    return this.http.get<any>(this.apiCheckIsDoneTest + `/${testId}/is-done`).pipe(
      map((response: any) => {
        return <boolean>response.data;
      }),
    );
  }

}
