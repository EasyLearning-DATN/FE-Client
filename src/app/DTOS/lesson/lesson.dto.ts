import {IsNotEmpty, IsString} from 'class-validator';

export class LessonDTO {
  @IsString()
  @IsNotEmpty()
  name: string | undefined;

  @IsString()
  description: string | undefined;

  @IsString()
  image_id: string | undefined;

}
