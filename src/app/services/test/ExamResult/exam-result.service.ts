import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ExamResultResponses } from 'src/app/responses/ExamResult/examresult.responses';
import { environment } from 'src/environments/environments';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExamResultService {

  private apiGetExamResult = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_TESTREPORT + environment.API_EXAMRESULT;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
  ) { }

  getExamResult(testId: string){
    return this.http.get(this.apiGetExamResult + "?testId=" + testId).pipe(
      map((res: any) => {
        return <ExamResultResponses>res.data;
      }), tap(
        res => {
          this.sharedService.examResult = res;
        }, error => {
          console.log(error.message);
        },
      ),
    );
  }
}
