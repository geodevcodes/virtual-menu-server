import { IsNotEmpty, IsString } from 'class-validator';

export class SearchBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
