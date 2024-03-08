import {IsNotEmpty, Length} from "class-validator";

export class QuestionTypeDTO {
  @Length(2, 255)
  @IsNotEmpty()
  name: string | undefined;

  @IsNotEmpty()
  @Length(1, 5)
  code: string | undefined;
}
