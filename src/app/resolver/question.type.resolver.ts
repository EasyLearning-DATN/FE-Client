import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {SharedService} from "../services/shared/shared.service";
import {QuestionTypeService} from "../services/shared/question-type/question-type.service";
import {QuestionTypeResponses} from "../responses/question-type/question-type.responses";

export const questionTypeResolver: ResolveFn<QuestionTypeResponses[]> = (route, state) => {
  const sharedService = inject(SharedService);
  const questionTypeService = inject(QuestionTypeService);
  const questionTypes = sharedService.questionTypeResponses;
  if (questionTypes === undefined) {
    return questionTypeService.getListQuestionTypes();
  } else {
    return questionTypes;
  }
};
