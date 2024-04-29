import {IsNotEmpty, IsString} from 'class-validator';

export class ReportDTO {
  @IsString()
  targetId: string  = '';

  @IsString()
  reason: string = '';

  @IsString()
//   type gắn mặc định là LESSON
    type: string = '';

    @IsString()
    image: string = '';

}
