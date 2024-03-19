import {
    IsString,
    IsNotEmpty,
    IsDate
} from 'class-validator';

export class UserDTO {
    @IsString()
    fullName: string = '';

    @IsString()
    @IsNotEmpty()
    email: string = '';

    @IsString()
    dayOfBirth: string = '';
}

