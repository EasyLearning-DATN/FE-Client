import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environments";
import {SharedService} from "../shared/shared.service";
import {QuestionDTO} from "../../DTOS/question/question.dto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiGetListQuestion = environment.API_URL + environment.API_PUBLIC + environment.VERSION_1 + environment.API_QUESTION;
  private apiCreateListQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION + environment.API_LIST;
  private apiDeleteQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION;
  private apiUpdateQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION;
  private apiImportQuestion = environment.API_URL + environment.API_MEMBER + environment.VERSION_1 + environment.API_QUESTION + environment.API_IMPORT;

  constructor(private sharedService: SharedService, private http: HttpClient) {
  }

  putListQuestion(listQuestion: QuestionDTO[]) {
    return this.http.post(this.apiCreateListQuestion, listQuestion);
  }

  createListQuestionImport(listQuestion: any, lessonId: any) {
    console.log(listQuestion, lessonId);
    return this.http.post(this.apiCreateListQuestion, {listQuestion, lesson_id: lessonId});
  }

  deleteQuestion(id: string) {
    return this.http.delete(this.apiDeleteQuestion + '/' + id);
  }

  updateQuestion(updateQuestion: QuestionDTO, questionId: string) {
    return this.http.put(this.apiUpdateQuestion + '/' + questionId, updateQuestion);
  }

  importQuestion(file: File) {
    const formData = new FormData();
    formData.append('question_file', file);
    return this.http.post(this.apiImportQuestion, formData);
  }
}
