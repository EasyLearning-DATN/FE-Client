import {
    IsString,
    IsNotEmpty,
    IsDate
} from 'class-validator';

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    username: string | undefined;

    @IsString()
    @IsNotEmpty()
    password: string | undefined;
}