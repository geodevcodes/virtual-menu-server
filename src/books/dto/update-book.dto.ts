import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiPropertyOptional({
    example: 'The Great Gatsby (Updated Edition)',
  })
  title?: string;

  @ApiPropertyOptional({
    example: 'F. Scott Fitzgerald',
  })
  author?: string;

  @ApiPropertyOptional({
    example: 1926,
  })
  publicationYear?: number;
}
