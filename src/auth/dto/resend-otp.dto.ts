import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendOtpDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
