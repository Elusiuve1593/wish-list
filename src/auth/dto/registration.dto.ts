import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength
} from 'class-validator';

export class RegistrationDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
