import {Injectable} from '@angular/core';
import {SharedService} from "../shared.service";
import {environment} from "../../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";
import {QuestionTypeResponsesList} from "../../../responses/question-type/question-type.responses";

@Injectable({
  providedIn: 'root',
})
export class QuestionTypeService {
  private apiGetListQuestionTypes = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_QUESTION_TYPE;

  constructor(private sharedService: SharedService, private http: HttpClient) {

  }

  getListQuestionTypes() {
    return this.http.get<any>(this.apiGetListQuestionTypes).pipe(
      map((response) => {
        const questionTypeResponsesList: QuestionTypeResponsesList = response.data;
        return questionTypeResponsesList.data;
      }),
      tap((questionTypeResponses) => {
        // this.sharedService.questionTypeResponses = questionTypeResponses;
        sessionStorage.setItem("questionTypes", JSON.stringify(questionTypeResponses));
      }),
    );
  }
}
