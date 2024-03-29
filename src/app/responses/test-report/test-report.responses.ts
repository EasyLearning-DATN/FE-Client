import {BaseReponses} from "../base.reponses";
import {ImageResponses} from "../image/image.responses";
import {UserResponse} from "../user/user.responses";

export interface TestReportListResponse {
  data: TestReportResponse[];
  totalPage: number;
}

export interface TestReportResponse extends BaseReponses {
  test: TestOfTestReportResponse;
  question_report: QuestionReportResponse[];
  user_info: UserResponse;
  doingDate: Date;
  total_point: number;
}

export interface TestOfTestReportResponse {
  name: string;
  time_total: number; //seconds
  time_question: number;
  total_question: number;
  image: ImageResponses;

}


export interface QuestionReportResponse {
  title: string;
  description: string;
  weighted: number;
  answers: AnswerReportResponse[];
  answer_of_user: string[];
  question_type_code: string;
  point: number;
}

export interface AnswerReportResponse {
  value: string;
  is_correct: string;
}
