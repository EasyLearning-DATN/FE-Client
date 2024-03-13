import {IsNumber, IsString} from "class-validator";

export class TestDTO {
  @IsString()
  name: string = '';
  @IsString()
  description: string = '';
  @IsNumber()
  time_total: number = 0;
  @IsNumber()
  time_question: number = 0;
  @IsString()
  view_result_type_code: string = '';
  @IsString()
  question_ids: string[] = [''];
  @IsString()
  image_id: string = '';
}
