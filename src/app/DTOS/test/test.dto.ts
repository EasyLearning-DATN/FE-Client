import {IsNumber, IsString} from "class-validator";
import {TestResponses} from "../../responses/test/test.responses";

export class TestDTO {
  @IsString()
  name: string = '';
  @IsString()
  description: string = '';
  @IsNumber()
  time_total: number | null = null;
  @IsNumber()
  time_question: number | null = null;
  @IsString()
  view_result_type_code: string = '';
  @IsString()
  question_ids: string[] = [''];
  @IsString()
  image_id: string = '';
  @IsNumber()
  total_question: number | null = null;
}

export class TempTest {
  test: TestResponses | null = null;
  endTime: Date | null = null;
  idCurrentQuestion: string = "";
}
