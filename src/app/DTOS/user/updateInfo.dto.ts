import {
    IsString,
    IsNotEmpty,
    IsDate
} from 'class-validator';

export class UpdateInfoDTO {
    @IsString()
    fullName: string = '';

    @IsString()
    @IsNotEmpty()
    email: string = '';

    @IsString()
    dayOfBirth: string = '';
}

