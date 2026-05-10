import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [], // import other modules if needed
  exports: [BooksService], // export BooksService if needed in other modules
})
export class BooksModule {}
