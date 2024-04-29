import {IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";
import {AnswerDTO} from "../answer/answer.dto";

export class QuestionDTO {
  @IsNotEmpty()
  @IsString()
  title: string | undefined;

  @IsString()
  description: string | undefined;

  @IsNumber()
  weighted: number | undefined;

  @IsString()
  lesson_id: string | undefined;

  @IsString()
  question_type_id: string | undefined;

  @ValidateNested()
  answers: AnswerDTO[] | undefined;
}
