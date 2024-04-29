     import {
          IsString,
          IsNotEmpty,
          IsDate
     } from 'class-validator';

     export class SignupDTO {
     @IsString()
     username: string = '';

     @IsString()
     fullName: string = '';

     @IsString()
     @IsNotEmpty()
     email: string = '';

     @IsString()
     avatar: string = '';

     @IsString()
     @IsNotEmpty()
     password: string = '';

     @IsString()
     dayOfBirth: string = '';
     }

