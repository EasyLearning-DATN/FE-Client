import {BaseReponses} from "../base.reponses";

export interface TestResponses extends BaseReponses {
  name: string;
  user_info: {
    id: number;
    fullName: string;
    avatar: string | null;
  };
}

export interface TestListResponses {
  data: TestResponses[];
  totalPage: number;
}
