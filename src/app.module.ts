import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { MenuModule } from './menu/menu.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // time window in seconds
          limit: 10, // max 10 requests per 60 seconds
        },
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // specify the path to your .env file
      isGlobal: true, // make ConfigModule available globally
      load: [appConfig], // load additional configuration from app.config.ts
    }),
    BooksModule,
    UsersModule,
    PrismaModule,
    AuthModule,
    UploadModule,
    MenuModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
