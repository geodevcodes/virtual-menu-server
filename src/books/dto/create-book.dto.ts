import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID of the user who owns the book',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'The Great Gatsby',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @ApiProperty({
    example: 'F. Scott Fitzgerald',
    minLength: 3,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  author: string;

  @ApiProperty({
    example: 1925,
    minimum: 0,
  })
  @IsInt()
  @Min(0)
  publicationYear: number;
}
