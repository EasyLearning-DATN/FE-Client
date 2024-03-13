import {BaseReponses} from "../base.reponses";
import {AnswerResponses} from "../answer/answer.responses";

export interface QuestionListResponses {
  data: QuestionResponses[];
  totalPage: number;
}

export interface QuestionResponses extends BaseReponses {
  title: string;
  weighted: number;
  answers: AnswerResponses[];
  question_type_id: string;
  lesson_id: string;
}
