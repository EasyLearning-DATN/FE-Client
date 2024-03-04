import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';

export class LessonDTO {
  @IsString()
  @IsNotEmpty()
  name: string | undefined;

  @IsString()
  @IsNotEmpty()
  description: string | undefined;

  @IsString()
  @IsNotEmpty()
  image_url: string | undefined;

  @IsBoolean()
  @IsNotEmpty()
  is_public: boolean | undefined = true;
}
