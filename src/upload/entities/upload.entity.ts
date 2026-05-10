import { ApiProperty } from "@nestjs/swagger";

export class UploadEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  provider?: string;
}