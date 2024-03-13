import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {SharedService} from "../services/shared/shared.service";
import {QuestionTypeService} from "../services/shared/question-type/question-type.service";
import {QuestionTypeResponses} from "../responses/question-type/question-type.responses";

export const questionTypeResolver: ResolveFn<QuestionTypeResponses[]> = (route, state) => {
  // Tiêm service
  const sharedService = inject(SharedService);
  const questionTypeService = inject(QuestionTypeService);

  // Lấy dữ liệu sharedService
  const questionTypes = sharedService.questionTypeResponses;

  // Kiểm tra dữ liệu đó coi nó được tạo chưa
  if (questionTypes === undefined) {
    return questionTypeService.getListQuestionTypes();
  } else {
    return questionTypes;
  }
};
