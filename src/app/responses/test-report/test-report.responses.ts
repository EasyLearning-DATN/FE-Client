import {BaseReponses} from '../base.reponses';
import {ImageResponses} from '../image/image.responses';

export interface TestReportListResponse {
  data: TestReportResponse[];
  totalPage: number;
}

export interface TestReportResponse extends BaseReponses {
  test: TestOfTestReportResponse;
  question_report: QuestionReportResponse[];
  user_info: {
    id: number, fullName: string, avatar: {
      url: string;
      publicId: string
    }
  };
  doingDate: Date;
  total_point: number;
  total_time_finish: number;
  question_incorrect_num: number;
  question_correct_num: number;

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
