import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
     const appName = this.configService.get<string>('APP_NAME');
     console.log(`App Name from .env: ${appName}`);
      return `Hey there! welcome to geodevcodes ${appName} endpoints`;
    }
}