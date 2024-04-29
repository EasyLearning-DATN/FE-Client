import {BaseReponses} from '../base.reponses';
import {ImageResponses} from '../image/image.responses';
import {QuestionResponses} from '../question/question.responses';
import {ResultTypeResponses} from '../result_type_id/result_type.responses';

export interface TestResponses extends BaseReponses {
  id: string;
  name: string;
  description: string;
  image: ImageResponses;
  created_date: Date;
  created_by: string;
  last_modified_date: Date;
  last_modified_by: string;
  time_total: number | null;
  time_question: number | null;
  total_question: number;
  view_result_type_id: ResultTypeResponses;
  question_tests: QuestionResponses[];
  doing_time: number;
  user_info: {
    id: number;
    fullName: string;
    avatar: ImageResponses;
    username: string;
  };
  open_time: Date | null;
  close_time: Date | null;
  max_point: number | null;
}

export interface TestListResponses {
  data: TestResponses[];
  totalPage: number;
}
