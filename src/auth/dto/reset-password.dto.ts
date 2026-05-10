import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ example: 'NewPassword123!' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
