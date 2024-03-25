import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class TestReportItemDTO {
  @IsNotEmpty()
  question_id: string = '';
  answers: string[] | null = null;
}

export class TestReportDTO {
  @IsString()
  test_id: string = '';
  @IsString()
  user_info_id: string = '';
  report_items: TestReportItemDTO[] | null = null;
  @IsNumber()
  total_point: number | null = 0;

}
