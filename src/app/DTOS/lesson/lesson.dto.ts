import {
    IsString,
    IsNotEmpty,
    IsDate,
    IsBoolean
} from 'class-validator';

export class LessonDTO {
    @IsString()
    @IsNotEmpty()
    name: string | undefined;

    @IsString()
    description: string | undefined;

    @IsString()
    image_url: string | undefined;
}