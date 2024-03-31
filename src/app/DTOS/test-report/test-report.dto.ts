import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class TestReportItemDTO {
  @IsNotEmpty()
  question_id: string = '';
  answers: string[] | null = null;
}

export class TestReportDTO {
  @IsString()
  test_id: string = '';
  @IsString()
  user_info_id: number = 0;
  report_items: TestReportItemDTO[] = [];
  @IsNumber()
  total_point: number = 0;
  total_time_finish: number = 0;
}
