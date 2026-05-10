import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty({
    example: 'joedoe@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
  })
  fullName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
