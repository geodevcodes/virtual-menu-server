import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: 'Hotel Main Menu' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'https://example.com/restaurant-review' })
  @IsOptional()
  @IsUrl()
  restaurantReviewUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/spa-review' })
  @IsOptional()
  @IsUrl()
  spaReviewUrl?: string;

  @ApiPropertyOptional({ example: 'https://example.com/accommodation-review' })
  @IsOptional()
  @IsUrl()
  accommodationReviewUrl?: string;

  // Accept frontend typo
  @ApiPropertyOptional({ example: 'https://example.com/accommodation-review' })
  @IsOptional()
  @IsUrl()
  accomodationReviewUrl?: string;
}
