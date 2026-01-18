import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserParam {
  @IsString()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password: string;

  @IsIn(['admin', 'teacher', 'student'])
  @IsOptional()
  role: 'admin' | 'teacher' | 'student';
}
