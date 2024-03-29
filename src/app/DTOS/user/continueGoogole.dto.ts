import {
    IsString,
    IsNotEmpty,
} from 'class-validator';

export class ContinueGoogoleDto {
    @IsString()
    @IsNotEmpty()
    token!: string;
}
