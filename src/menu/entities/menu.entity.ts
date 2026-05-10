import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MenuEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  foodMenuUrl?: string;

  @ApiPropertyOptional()
  drinkMenuUrl?: string;

  @ApiPropertyOptional()
  spaMenuUrl?: string;

  @ApiPropertyOptional()
  accommodationMenuUrl?: string;

  @ApiPropertyOptional()
  restaurantReviewUrl?: string;

  @ApiPropertyOptional()
  spaReviewUrl?: string;

  @ApiPropertyOptional()
  accommodationReviewUrl?: string;

  @ApiPropertyOptional()
  qrCodeUrl?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
