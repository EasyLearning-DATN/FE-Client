import {BaseReponses} from "../base.reponses";

export interface QuestionTypeResponses extends BaseReponses {
  name: string;
  code: string;
}

export interface QuestionTypeResponsesList {
  data: QuestionTypeResponses[];
  totalPage: number;
}
