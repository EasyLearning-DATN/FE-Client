import {IsBoolean, IsNotEmpty, Length} from "class-validator";

export class AnswerDTO {
  @IsNotEmpty()
  @Length(1, 255)
  value: string | undefined;

  @IsBoolean()
  @IsNotEmpty()
  is_correct: boolean | undefined;

  question_id: string | undefined;
}
