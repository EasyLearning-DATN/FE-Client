import {
     IsString,
     IsNotEmpty,
     IsDate
} from 'class-validator';

export class SignupDTO {
   @IsString()
   username: string | undefined;

   @IsString()
   fullName: string | undefined;

    @IsString()
    @IsNotEmpty()
    email: string | undefined;

    @IsString()
    @IsNotEmpty()
    password: string | undefined;

    @IsString()
    dayOfBirth: string | undefined;
}

