import { QuestionResponses } from "../question/question.responses";
import { TestResponses } from "../test/test.responses";
import { UserResponse } from "../user/user.responses";

export interface ExamResultResponses {
    id: string;
    doingDate: string;
    created_date: string;
    created_by: string;
    last_modified_date: string;
    last_modified_by: string;
    test: TestResponses;
    user_info: UserResponse;
    question_report: QuestionResponses[];
    total_point: number;
    question_correct_num: number;
    question_incorrect_num: number;
    total_time_finish: number;
    }
