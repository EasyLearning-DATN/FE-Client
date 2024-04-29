import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {QuestionTypeService} from "../services/shared/question-type/question-type.service";
import {QuestionTypeResponses} from "../responses/question-type/question-type.responses";

export const questionTypeResolver: ResolveFn<QuestionTypeResponses[]> = (route, state) => {
  // Tiêm service
  // const sharedService = inject(SharedService);
  const questionTypeService = inject(QuestionTypeService);

  // Lấy dữ liệu sharedService
  // const questionTypes = sharedService.questionTypeResponses;

  // Lấy dữ liệu từ sessionStorage
  const questionTypeSes: QuestionTypeResponses[] | null = JSON.parse(<string>sessionStorage.getItem('questionTypes'));

  // Kiểm tra dữ liệu đó coi nó được tạo chưa
  if (questionTypeSes === null) {
    return questionTypeService.getListQuestionTypes();
  } else {
    return questionTypeSes;
  }
};
