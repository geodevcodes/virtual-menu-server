import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// export class PassportLocalGuard extends AuthGuard('local') { }
export class PassportJwtAuthGuard extends AuthGuard('jwt') {}
