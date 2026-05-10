import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'joedoe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'PasswordTest@12',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
