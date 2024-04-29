import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDTO {
  @IsString()
  @IsNotEmpty()
  content: string | undefined;

  @IsString()
  lessonId: string | undefined;

  @IsString()
  rootId: string = '';

  @IsString()
  usernameReply: string = '';

  constructor(content: string, lessonId: string) {
    this.content = content;
    this.lessonId = lessonId;
  }
}
