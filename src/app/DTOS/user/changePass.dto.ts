import {
    IsString,
    IsNotEmpty,
    IsDate
} from 'class-validator';

export class ChangePassDTO {
    @IsString()
    @IsNotEmpty()
    password_old!: string;

    @IsString()
    @IsNotEmpty()
    password_new!: string;
}