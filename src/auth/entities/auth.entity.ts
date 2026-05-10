import { ApiProperty } from '@nestjs/swagger';

class AuthUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ type: AuthUser })
  user: AuthUser;
}

export class MessageEntity {
  @ApiProperty()
  message: string;
}