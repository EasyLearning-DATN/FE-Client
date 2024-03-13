import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {QuestionListResponses} from "../responses/question/question.responses";
import {QuestionService} from "../services/question/question.service";

export const questionsResolver: ResolveFn<QuestionListResponses> = (route, state) => {
  const questionService = inject(QuestionService);
  return questionService.getListQuestion(route.params['id']);
};
