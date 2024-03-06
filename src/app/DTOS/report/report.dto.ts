import {IsNotEmpty, IsString} from 'class-validator';

export class ReportDTO {
  @IsString()
  targetId: string | undefined;

  @IsString()
  reason: string | undefined;

  @IsString()
//   type gắn mặc định là LESSON
    type: string | undefined;

}
