import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'joedoe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    example: 'PasswordTest@12',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}