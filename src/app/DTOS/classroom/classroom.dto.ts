import {IsNotEmpty, IsString} from 'class-validator';

export class ClassroomDTO {
  @IsString()
  @IsNotEmpty()
  name: string | undefined;

  @IsString()
  description: string | undefined;

  @IsString()
  image_id: string | undefined;

  isPublic: boolean | undefined;
}

export class ClassroomInviteDTO {
  classRoomId: string | undefined;
  emails: string[] | undefined;
}
